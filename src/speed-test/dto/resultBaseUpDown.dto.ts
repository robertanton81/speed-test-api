export class ResultBaseUpDownDto {
  bandwidth: number;
  bytes: number;
  elapsed: number;
  latency: {
    iqm: number;
    low: number;
    high: number;
    jitter: number;
  };
}
