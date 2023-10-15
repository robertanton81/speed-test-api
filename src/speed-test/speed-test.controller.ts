import { Controller, Sse } from '@nestjs/common';
import { SpeedTestService } from './speed-test.service';
import { from, map, Observable } from 'rxjs';

@Controller()
export class SpeedTestController {
  constructor(private readonly speedTestService: SpeedTestService) {}

  @Sse('latency-test')
  executeSpeedTest(): Observable<MessageEvent> {
    return from(
      this.speedTestService.executeSpeedTest({
        download: false,
        upload: false,
      }),
    ).pipe(
      map((event) => {
        return { data: event } as MessageEvent;
      }),
    );
  }
}
