import { BaseEventDto, IResultEventDto } from '../events';
import {
  IEventInterface,
  IEventServer,
  IResult,
  IResultBaseUpDown,
} from '../../types';

export class UploadTestResultDto
  extends BaseEventDto
  implements Omit<IResultEventDto, 'ping' | 'download'>
{
  packetLoss: number;
  isp: string;
  interface: IEventInterface;
  server: IEventServer;
  result: IResult;
  upload: IResultBaseUpDown;

  constructor({ download, ping, ...rest }: IResultEventDto) {
    super(rest);
    Object.assign(this, rest);
  }
}
