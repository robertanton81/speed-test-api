import { IPing } from 'src/speed-test/types';
import { BaseEventDto } from './baseEvent.dto';

export class PingEventDto extends BaseEventDto {
  ping: IPing;
}
