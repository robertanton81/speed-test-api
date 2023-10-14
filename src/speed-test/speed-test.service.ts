import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as childProcess from 'child_process';
import { chMod } from './utils/chmod.util';
import { fromEvent } from 'rxjs';
import * as stringDecoder from 'string_decoder';

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
      const args = ['-p', '--accept-license', '--accept-gdpr', '--format=json'];

      const decoder = new stringDecoder.StringDecoder('utf8');

      const cliProcess = childProcess.spawn(binary, args);

      cliProcess.stdout.on('data', (data) => {
        try {
          const stringData = decoder.write(data);
          const lines = stringData?.trim().split('\n');

          lines.forEach((line) => {
            const json = JSON.parse(line);
            console.log(json);
          });
          // const json = JSON.parse(stringData);
          console.log(data);
        } catch (e) {
          console.error(e);
        }
      });

      const obsFrom = fromEvent(cliProcess.stdout, 'data');
      const obsError = fromEvent(cliProcess.stderr, 'data');
      const obsClose = fromEvent(cliProcess, 'close');
      const obsExit = fromEvent(cliProcess, 'exit');

      obsClose.subscribe((data) => {
        console.log('close', data);
      });

      obsExit.subscribe((data) => {
        console.log('exit', data);
      });

      // obsFrom.subscribe((data: Buffer) => {
      //   try {
      //     const stringData = decoder.write(data);
      //     const lines = stringData?.trim().split('\n');
      //
      //     console.log(stringData);
      //   } catch (e) {
      //     console.error(e);
      //   }
      // });
    } catch (e) {
      console.error(e);
    }
  }
}
