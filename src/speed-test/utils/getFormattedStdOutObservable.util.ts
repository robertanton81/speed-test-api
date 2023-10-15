import { Observable, share, catchError, of, map } from 'rxjs';
import * as stringDecoder from 'string_decoder';
import { BaseEventDto } from '../dtos/events';

export const getFormattedStdoutObservable = (
  stdOutObs: Observable<Buffer>,
): Observable<BaseEventDto[] | Error> => {
  try {
    const decoder = new stringDecoder.StringDecoder('utf8');
    return stdOutObs.pipe(
      map((data: Buffer) => {
        const stringData = decoder.write(data);
        const lines = stringData?.trim().split('\n');

        return lines.map((line) => JSON.parse(line));
      }),
      catchError((err) => {
        console.log(err);

        return of(err);
      }),
      share(),
    );
  } catch (e) {
    console.log(e);

    return of(e);
  }
};
