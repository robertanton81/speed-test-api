import {
  IEventInterface,
  IEventServer,
  IResult,
  IResultBaseUpDown,
  IResultPing,
} from 'src/speed-test/types';
import { BaseEventDto, IBaseEventDto } from './baseEvent.dto';

export interface IResultEventDto extends IBaseEventDto {
  ping: IResultPing;
  download: IResultBaseUpDown;
  upload: IResultBaseUpDown;
  packetLoss: number;
  isp: string;
  interface: IEventInterface;
  server: IEventServer;
  result: IResult;
}

export class ResultEventDto extends BaseEventDto implements IResultEventDto {
  ping: IResultPing;
  download: IResultBaseUpDown;
  upload: IResultBaseUpDown;
  packetLoss: number;
  isp: string;
  interface: IEventInterface;
  server: IEventServer;
  result: IResult;
}
