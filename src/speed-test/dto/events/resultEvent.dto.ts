import {
  IResultPing,
  IResultBaseUpDown,
  IEventInterface,
  IEventServer,
  IResult,
} from 'src/speed-test/types';
import { BaseEventDto } from './baseEvent.dto';
export class ResultEventDto extends BaseEventDto {
  ping: IResultPing;
  download: IResultBaseUpDown;
  upload: IResultBaseUpDown;
  packetLoss: number;
  isp: string;
  interface: IEventInterface;
  server: IEventServer;
  result: IResult;
}
