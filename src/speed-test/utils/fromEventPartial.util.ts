import { fromEvent } from 'rxjs';
import { Stream } from 'stream';
import { Logger } from '@nestjs/common';

export const partialFromEvent = (eventName: string) => (readable: Stream) => {
  const logger = new Logger('fn() partialFromEvent');
  try {
    logger.log(`Getting event stream: ${eventName}`);

    const event$ = fromEvent(readable, eventName);
    logger.log(`Successfully got event stream: ${eventName}`);

    return event$;
  } catch (error) {
    const exception = new Error(
      `Error reading from event stream. Original message: ${error.message}`,
    );
    logger.error(exception);

    return exception;
  }
};
