import {
  DownloadEventDto,
  PingEventDto,
  StartEventDto,
  UploadEventDto,
} from '../dto/events';

export type IEvents =
  | DownloadEventDto
  | UploadEventDto
  | PingEventDto
  | StartEventDto;
