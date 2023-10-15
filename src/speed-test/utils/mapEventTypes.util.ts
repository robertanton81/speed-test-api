import {
  BaseEventDto,
  DownloadEventDto,
  PingEventDto,
  ResultEventDto,
  StartEventDto,
  UploadEventDto,
} from '../dto/events';
import { IEvents } from '../types';

export const mapEventTypes = (events: BaseEventDto[]): Error | IEvents[] => {
  if (events instanceof Error) return events;

  return events.map((event) => {
    switch (event.type) {
      case 'download':
        return event as DownloadEventDto;
      case 'upload':
        return event as UploadEventDto;
      case 'testStart':
        return event as StartEventDto;
      case 'ping':
        return event as PingEventDto;
      case 'result':
        return event as ResultEventDto;
    }
  });
};
