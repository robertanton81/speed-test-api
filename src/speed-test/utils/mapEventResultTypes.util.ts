import { BaseEventDto, ResultEventDto } from '../dtos/events';
import { IEvents, ITestType } from '../types';
import {
  DownloadTestResultDto,
  LatencyTestResultDto,
  UploadTestResultDto,
} from '../dtos/results';
import { Logger } from '@nestjs/common';

export const mapEventResultTypes =
  (testType: ITestType) =>
  (events: BaseEventDto[] | Error): Error | IEvents[] => {
    const logger = new Logger(`fn() mapEventResultTypes`);
    try {
      logger.log(`Mapping event result types for test type: ${testType}`);
      if (events instanceof Error) return events;

      return events.map((event: IEvents) => {
        if (event instanceof Error) return event;

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
              return new BaseEventDto(event) as ResultEventDto;
          }
        }
        logger.log(
          `Success mapping event result types for test type: ${testType}`,
        );

        return event;
      });
    } catch (error) {
      const exception = new Error(
        `Error mapping event result types. Original error: ${error.message}`,
      );
      console.error(exception);

      return exception;
    }
  };
