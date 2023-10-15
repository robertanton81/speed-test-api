import { IBaseUpDown } from 'src/speed-test/types';
import { BaseEventDto } from './baseEvent.dto';

export class DownloadEventDto extends BaseEventDto {
  download: IBaseUpDown;
}
