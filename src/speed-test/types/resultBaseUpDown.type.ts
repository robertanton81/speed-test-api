import { ILatency } from './latency.type';

export interface IResultBaseUpDown {
  bandwidth: number;
  bytes: number;
  elapsed: number;
  latency: ILatency;
}
