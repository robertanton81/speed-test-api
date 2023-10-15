import { BaseEventDto, ResultEventDto } from '../dto/events';
import { IEvents, ITestType } from '../types';
import {
  DownloadTestResultDto,
  LatencyTestResultDto,
  UploadTestResultDto,
} from '../dto/results';

export const mapEventResultTypes =
  (testType: ITestType) =>
  (events: BaseEventDto[] | Error): Error | IEvents[] => {
    if (events instanceof Error) return events;

    return events.map((event: IEvents) => {
      if (event.type === 'result') {
        switch (testType) {
          case 'download':
            return new DownloadTestResultDto(event as ResultEventDto);
          case 'upload':
            return new UploadTestResultDto(event as ResultEventDto);
          case 'ping':
            return new LatencyTestResultDto(event as ResultEventDto);
          case 'full':
            return event;
          default:
            return new BaseEventDto(event as ResultEventDto);
        }
      }

      return event;
    });
  };
