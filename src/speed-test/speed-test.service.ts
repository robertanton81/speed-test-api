import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as childProcess from 'child_process';
import { chMod } from './utils/chmod.util';
import { formatLine } from './utils/format-line.util';
import * as kill from 'tree-kill';

@Injectable()
export class SpeedTestService {
  async ensureBinary() {
    const platformBinaries = {
      darwin: 'ookla-speedtest-1.2.0-macosx-universal/speedtest',
      win32: 'ookla-speedtest-1.2.0-win64/speedtest.exe',
      linux: 'ookla-speedtest-1.2.0-linux-x86_64/speedtest',
    };

    const platform = process.platform;
    const binFile = platformBinaries[platform];

    if (!binFile) {
      throw new Error(`Unsupported platform: ${platform}`);
    }

    const binFilePath = path.join(__dirname, 'binaries', binFile);
    await chMod(binFilePath, 0o755);

    return binFilePath;
  }

  async executeSpeedTest() {
    try {
      const binary = await this.ensureBinary();
      const args = ['-p', '--accept-license', '--accept-gdpr'];

      const cliProcess = childProcess.spawn(binary, args);
      cliProcess.on('error', (err) => {
        console.error(err);
      });

      function pendingPromise() {
        let resolve = undefined;
        let reject = undefined;
        const promise = new Promise((res, rej) => {
          resolve = res;
          reject = rej;
        });
        return { promise, resolve, reject };
      }

      const { promise, resolve, reject: rejectPromise } = pendingPromise();

      const reject = (err) => {
        aborted = true;
        rejectPromise(err);
      };

      const handleStdout = (isError, line) => {
        if (aborted) return;
        if (/^{/.test(line)) {
          let data;
          try {
            data = JSON.parse(line);
          } catch (err) {
            // Ignore
          }
          if (data) {
            if (data.timestamp) {
              data.timestamp = new Date(data.timestamp);
            }
            if (data.type) {
              const content = data[data.type];
              if (content) {
                if (currentPhase !== data.type && progressPhases[data.type]) {
                  priorProgress += progressPhases[currentPhase] || 0;
                  currentPhase = data.type;
                }
                if (
                  typeof content.progress === 'number' &&
                  progressPhases[data.type]
                ) {
                  data.progress =
                    priorProgress +
                    progressPhases[data.type] * content.progress;
                }
              }
            } else {
              if (data.suite || data.app || data.servers) {
                data.type = 'config';
              }
            }
            if (data.progress === undefined) {
              data.progress = priorProgress;
            }
            lastProgress = data.progress = Math.max(
              data.progress,
              lastProgress,
            );
            if (data.error) {
              return reject(new Error(data.error));
            }
            if (data.type === 'log' && data.level === 'error') {
              return reject(new Error(data.message));
            }
            if (data.type === 'result') {
              delete data.progress;
              delete data.type;
              result = data;
              return;
            }
            // if (progress) {
            //   progress(data);
            // }
            return;
          }
        }
        if (!line.trim()) return;
        if (isError) {
          if (!/] \[(info|warning)]/.test(line)) {
            errorLines.push(line);
          }
        }
      };
      // if (
      //   // cancel(setCancelHandler, () => {
      //   //   aborted = true;
      //   //   process.nextTick(() => reject(new Error('Test aborted')));
      //   // })
      // ) {
      //   throw new Error('Test aborted');
      // }

      const progressPhases = {
        ping: 2,
        download: 15,
        upload: 6,
      };
      const totalTime = Object.keys(progressPhases).reduce(
        (total, key) => total + progressPhases[key],
        0,
      );
      Object.keys(progressPhases).forEach(
        (key) => (progressPhases[key] /= totalTime),
      );

      const errorLines = [];
      let priorProgress = 0;
      let lastProgress = 0;
      let aborted = false;
      let result = undefined;
      let currentPhase;

      formatLine(cliProcess.stdout, handleStdout.bind(null, false));
      formatLine(cliProcess.stderr, handleStdout.bind(null, true));

      cliProcess.on('exit', resolve);
      cliProcess.on('error', reject);

      try {
        await promise;
      } finally {
        const pid = cliProcess.pid;
        cliProcess.kill();
        kill(pid);
      }
      if (errorLines.length) {
        const licenseAcceptedMessage =
          /License acceptance recorded. Continuing./;
        const acceptLicenseMessage =
          /To accept the message please run speedtest interactively or use the following:[\s\S]*speedtest --accept-license/;
        const acceptGdprMessage =
          /To accept the message please run speedtest interactively or use the following:[\s\S]*speedtest --accept-gdpr/;

        let error = errorLines.join('\n');

        if (licenseAcceptedMessage.test(error)) {
          error = '';
        } else if (acceptLicenseMessage.test(error)) {
          error = error.replace(
            acceptLicenseMessage,
            'To accept the message, pass the acceptLicense: true option',
          );
        } else if (acceptGdprMessage.test(error)) {
          error = error.replace(
            acceptGdprMessage,
            'To accept the message, pass the acceptGdpr: true option',
          );
        } else {
          error = error.replace(/===*[\s\S]*about\/privacy\n?/, '');
        }
        error = error.trim();
        if (error) throw new Error(error);
      }
      aborted = true;
      return result;
    } catch (e) {
      console.error(e);
    }
  }
}
