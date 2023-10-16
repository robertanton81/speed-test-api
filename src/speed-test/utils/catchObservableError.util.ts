import { Observable, of } from 'rxjs';
import { Logger } from '@nestjs/common';

export const catchObservableError = (functionName: string) => {
  const logger = new Logger(`fn() ${functionName}`);
  return (error: Error): Observable<Error> => {
    logger.error(error);

    return of(error);
  };
};
