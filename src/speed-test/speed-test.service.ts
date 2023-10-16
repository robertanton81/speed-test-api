import { Injectable, Logger } from '@nestjs/common';
import { UtilsService } from '@app/utils';
import * as path from 'path';
import {
  catchError,
  debounce,
  filter,
  finalize,
  fromEvent,
  map,
  Observable,
  of,
  switchMap,
  takeUntil,
  timer,
} from 'rxjs';
import {
  catchObservableError,
  ensureBinary,
  flattenEventValues,
  getFilteredEvents,
  getFormattedStdoutObservable,
  partialFromEvent,
  startSpeedTest,
} from './utils';
import { IEvents, ITestType } from './types';
import { mapEventResultTypes } from './utils/mapEventResultTypes.util';
import { BaseEventDto } from './dtos/events';

@Injectable()
export class SpeedTestService {
  private readonly logger = new Logger(SpeedTestService.name);
  constructor(private readonly utilsService: UtilsService) {}

  executeSpeedTest(args: ITestType): Observable<Error | IEvents> {
    try {
      const cliProcess = this.utilsService.pipe(
        path.join(__dirname, 'binaries'),
        ensureBinary,
        startSpeedTest,
      );

      if (cliProcess instanceof Error) return of(cliProcess);

      // TODO: test and refactor
      const onStderr$ = fromEvent(cliProcess.stderr, 'error').pipe(
        map((e) => {
          this.logger.error(e);

          return e;
        }),
        debounce(() => timer(1000)),
      );

      cliProcess.on('exit', (code) => {
        this.logger.log(`Child process exited with code ${code}`);
      });

      cliProcess.on('close', (code) => {
        this.logger.log(`Child process closed with code ${code}`);
      });

      const onStdout$: Observable<BaseEventDto[] | Error> =
        this.utilsService.pipe(
          cliProcess.stdout,
          partialFromEvent('data'),
          getFormattedStdoutObservable,
        );

      const cancel$ = onStdout$.pipe(
        filter(
          (events) =>
            Array.isArray(events) &&
            events.some((event) => event.type === 'result'),
        ),
        debounce(() => timer(1000)),
      );

      const flattened$ = onStdout$.pipe(
        map(getFilteredEvents(args)),
        map(mapEventResultTypes(args)),
        switchMap(flattenEventValues),
        catchError(catchObservableError('parsing events')),
      );

      return flattened$.pipe(
        takeUntil(cancel$),
        takeUntil(onStderr$),
        finalize(() => {
          cliProcess.kill(1);

          this.logger.log(`Stream completed`);
        }),
        catchError(catchObservableError('parsing events')),
      );
    } catch (error) {
      const exception = new Error(`Error executing test: ${error.message}`);
      this.logger.error(exception);

      return of(exception);
    }
  }
}
