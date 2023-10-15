import { IBaseUpDown } from 'src/speed-test/types';
import { BaseEventDto } from './baseEvent.dto';

export class UploadEventDto extends BaseEventDto {
  upload: IBaseUpDown;
}
