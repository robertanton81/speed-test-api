import { Injectable } from '@nestjs/common';
import { UtilsService } from '@app/utils';
import * as path from 'path';
import { catchError, filter, map, Observable, of } from 'rxjs';
import {
  ensureBinary,
  getFilteredEvents,
  getFormattedStdoutObservable,
  partialFromEvent,
  startSpeedTest,
} from './utils';
import { IEvents, IExecuteTestArgs } from './types';
import { mapEventTypes } from './utils/mapEventTypes.util';
import { BaseEventDto } from './dto/events';

@Injectable()
export class SpeedTestService {
  constructor(private readonly utilsService: UtilsService) {}

  executeSpeedTest(args: IExecuteTestArgs): Observable<Error | IEvents> {
    try {
      const cliProcess = this.utilsService.pipe(
        path.join(__dirname, 'binaries'),
        ensureBinary,
        startSpeedTest,
      );

      if (cliProcess instanceof Error) return of(cliProcess);

      const $onStdOut: Observable<BaseEventDto[] | Error> =
        this.utilsService.pipe(
          cliProcess.stdout,
          partialFromEvent('data'),
          getFormattedStdoutObservable,
        );

      return $onStdOut.pipe(
        map(getFilteredEvents(args)),
        map(mapEventTypes),
        filter(
          (events) =>
            (Array.isArray(events) && events.length > 0) ||
            events instanceof Error,
        ),
        catchError((err) => {
          console.log(err);

          return of(err);
        }),
      );
    } catch (e) {
      console.log(e);

      return of(e);
    }
  }
}
