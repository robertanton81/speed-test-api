import { IResultEventDto } from './resultEvent.dto';

export interface IBaseEventDto {
  type: string;
  timestamp: string;
}

export class BaseEventDto implements IBaseEventDto {
  type: string;
  timestamp: string;

  constructor({ type, timestamp }: IResultEventDto | IBaseEventDto) {
    this.timestamp = timestamp;
    this.type = type;
  }
}
