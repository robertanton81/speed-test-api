import { BaseEventDto, IResultEventDto } from '../events';
import {
  IEventInterface,
  IEventServer,
  IResult,
  IResultBaseUpDown,
} from '../../types';

export class DownloadTestResultDto
  extends BaseEventDto
  implements Omit<IResultEventDto, 'ping' | 'upload'>
{
  packetLoss: number;
  isp: string;
  interface: IEventInterface;
  server: IEventServer;
  result: IResult;
  download: IResultBaseUpDown;

  constructor({ upload, ping, ...rest }: IResultEventDto) {
    super(rest);
    Object.assign(this, rest);
  }
}
