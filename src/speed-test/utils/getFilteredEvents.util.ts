import { IEvents, ITestType } from '../types';
import { BaseEventDto, ResultEventDto } from '../dtos/events';
import { Logger } from '@nestjs/common';

// because used cli does not have option to call only specific test type
// it is necessary to filter events to get only those needed
// and to not wait for all events to be fetched with empty data, pending result is sent instead
export const getFilteredEvents =
  (testType: ITestType) =>
  (events: BaseEventDto[] | Error): Error | IEvents[] => {
    const logger = new Logger(`fn() getFilteredEvents`);
    try {
      logger.log(`Filtering events for test type: ${testType}`);
      if (events instanceof Error) return events;

      const filtered = events.map((event) => {
        if (testType === 'full') return event;

        switch (event.type) {
          case 'testStart':
          case 'result':
            return event as IEvents;
          default:
            return testType === event.type
              ? event
              : ({
                  timestamp: event.timestamp,
                  type: 'result pending',
                  info: '...fetching result data',
                } as unknown as ResultEventDto);
        }
      });

      logger.log(`Successfully filtered events for test type: ${testType}`);

      return filtered;
    } catch (error) {
      const exception = new Error(
        `Error filtering events. Original error: ${error.message}`,
      );
      logger.error(exception);

      return exception;
    }
  };
