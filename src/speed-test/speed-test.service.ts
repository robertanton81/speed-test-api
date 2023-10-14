import { Injectable } from '@nestjs/common';
import { filter, from, fromEvent, mergeMap, share, switchMap } from 'rxjs';
import * as stringDecoder from 'string_decoder';
import { ensureBinary } from './utils/ensureBinary.util';
import { UtilsService } from '@app/utils';
import { startSpeedTest } from './utils/startSpeedTest.util';

@Injectable()
export class SpeedTestService {
  constructor(private readonly utilsService: UtilsService) {}

  async executeSpeedTest() {
    try {
      const cliProcess = await this.utilsService.pipe(
        null,
        ensureBinary,
        startSpeedTest,
      );

      if (cliProcess instanceof Error) return cliProcess;

      const decoder = new stringDecoder.StringDecoder('utf8');

      const $obsStdout = fromEvent(cliProcess.stdout, 'data');

      const $obsError = fromEvent(cliProcess.stderr, 'data');
      const $obsClose = fromEvent(cliProcess, 'close');
      const $obsExit = fromEvent(cliProcess, 'exit');

      const $obsFormatOutput = $obsStdout.pipe(
        mergeMap((data: Buffer) => {
          const stringData = decoder.write(data);
          const lines = stringData?.trim().split('\n');

          return from(lines.map((line) => JSON.parse(line)));
        }),
        share(),
      );

      const $testStart = $obsFormatOutput
        .pipe(filter((x) => x.type === 'testStart'))
        .subscribe((data) => {
          console.debug('testStart', data);
        });

      const $ping = $obsFormatOutput
        .pipe(filter((x) => x.type === 'ping'))
        .subscribe((data) => {
          console.debug('ping', data);
        });

      const $download = $obsFormatOutput
        .pipe(filter((x) => x.type === 'download'))
        .subscribe((data) => {
          console.debug('download', data);
        });

      const $upload = $obsFormatOutput
        .pipe(filter((x) => x.type === 'upload'))
        .subscribe((data) => {
          console.debug('upload', data);
        });

      const $testEnd = $obsFormatOutput.pipe(
        filter((data) => data.type === 'result'),
        switchMap((result) => result.url),
      );
    } catch (e) {
      console.error(e);
    }
  }
}
