import { ITestType } from '../types';
import { BaseEventDto } from '../dtos/events';

export const getFilteredEvents =
  (testType: ITestType) => (events: BaseEventDto[] | Error) => {
    if (events instanceof Error) return events;

    return events.filter((event) => {
      if (testType === 'full') return true;

      switch (event.type) {
        case 'testStart':
          return true;
        case 'result':
          return true;
        default:
          return testType === event.type;
      }
    });
  };
