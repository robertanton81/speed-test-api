import { IExecuteTestArgs } from '../types';
import { BaseEventDto } from '../dto/events';

export const getFilteredEvents =
  (args: IExecuteTestArgs) => (events: BaseEventDto[] | Error) => {
    if (events instanceof Error) return events;

    return events.filter((event) => {
      switch (event.type) {
        case 'download':
          return args.download;
        case 'upload':
          return args.upload;
        case 'testStart':
          return true;
        case 'ping':
          return true;
        case 'result':
          return true;
        default:
          return false;
      }
    });
  };
