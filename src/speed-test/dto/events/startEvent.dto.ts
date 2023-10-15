import { IEventInterface, IEventServer } from 'src/speed-test/types';
import { BaseEventDto } from './baseEvent.dto';

export class StartEventDto extends BaseEventDto {
  isp: string;
  interface: IEventInterface;
  server: IEventServer;
}
