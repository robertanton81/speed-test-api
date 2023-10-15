import { BaseEventDto, IResultEventDto } from '../events';
import {
  IEventInterface,
  IEventServer,
  IResult,
  IResultPing,
} from '../../types';

export class LatencyTestResultDto extends BaseEventDto {
  ping: IResultPing;
  packetLoss: number;
  isp: string;
  interface: IEventInterface;
  server: IEventServer;
  result: Omit<IResult, 'download' | 'upload'>;

  constructor({ download, upload, ...rest }: IResultEventDto) {
    super(rest);
    Object.assign(this, rest);
  }
}
