import {
  BaseEventDto,
  DownloadEventDto,
  PingEventDto,
  StartEventDto,
  UploadEventDto,
} from '../dtos/events';
import {
  DownloadTestResultDto,
  LatencyTestResultDto,
  UploadTestResultDto,
} from '../dtos/results';

export type IEvents =
  | DownloadEventDto
  | UploadEventDto
  | PingEventDto
  | StartEventDto
  | LatencyTestResultDto
  | DownloadTestResultDto
  | UploadTestResultDto
  | BaseEventDto;
