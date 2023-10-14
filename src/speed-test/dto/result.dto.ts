import { ResultBaseUpDownDto } from './resultBaseUpDown.dto';
import { ResultPingDto } from './resultPing.dto';
import { ResultInterfaceDto } from './resultInterface.dto';
import { ResultServerDto } from './resultServer.dto';

export class ResultDto {
  timestamp: string;
  ping: ResultPingDto;
  download: ResultBaseUpDownDto;
  upload: ResultBaseUpDownDto;
  packetLoss: number;
  isp: string;
  interface: ResultInterfaceDto;
  server: ResultServerDto;
  id: string;
  url: string;
  persisted: boolean;
}
