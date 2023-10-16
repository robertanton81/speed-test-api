import { Observable, share, catchError, of, map } from 'rxjs';
import * as stringDecoder from 'string_decoder';
import { BaseEventDto } from '../dtos/events';
import { catchObservableError } from './catchObservableError.util';
import { Logger } from '@nestjs/common';

export const getFormattedStdoutObservable = (
  stdOutObs: Observable<Buffer>,
): Observable<BaseEventDto[] | Error> => {
  const logger = new Logger(`fn() getFormattedStdoutObservable`);
  try {
    const decoder = new stringDecoder.StringDecoder('utf8');

    logger.log(`Getting formatted stdout observable`);

    const $formattedStdOut = stdOutObs.pipe(
      map((data: Buffer) => {
        const stringData = decoder.write(data);
        const lines = stringData?.trim().split('\n');

        return lines.map((line) => JSON.parse(line));
      }),
      catchError(catchObservableError('getFormattedStdoutObservable')),
      share(),
    );

    logger.log(`Successfully got formatted stdout observable`);

    return $formattedStdOut;
  } catch (e) {
    logger.error(e);

    return of(e);
  }
};
