import {
  BaseEventDto,
  DownloadEventDto,
  PingEventDto,
  StartEventDto,
  UploadEventDto,
} from '../dto/events';
import {
  DownloadTestResultDto,
  LatencyTestResultDto,
  UploadTestResultDto,
} from '../dto/results';

export type IEvents =
  | DownloadEventDto
  | UploadEventDto
  | PingEventDto
  | StartEventDto
  | LatencyTestResultDto
  | DownloadTestResultDto
  | UploadTestResultDto
  | BaseEventDto;
