import { Controller, Sse } from '@nestjs/common';
import { SpeedTestService } from './speed-test.service';
import { from, map, Observable } from 'rxjs';

@Controller()
export class SpeedTestController {
  constructor(private readonly speedTestService: SpeedTestService) {}

  @Sse('latency-test')
  executeLatencyTest(): Observable<MessageEvent> {
    return from(this.speedTestService.executeSpeedTest('ping')).pipe(
      map((events) => {
        return { data: events } as MessageEvent;
      }),
    );
  }

  @Sse('download-test')
  executeDownloadTest(): Observable<MessageEvent> {
    return from(this.speedTestService.executeSpeedTest('download')).pipe(
      map((events) => {
        return { data: events } as MessageEvent;
      }),
    );
  }

  @Sse('upload-test')
  executeUploadTest(): Observable<MessageEvent> {
    return from(this.speedTestService.executeSpeedTest('upload')).pipe(
      map((events) => {
        return { data: events } as MessageEvent;
      }),
    );
  }

  @Sse('full-test')
  executeFullTest(): Observable<MessageEvent> {
    return from(this.speedTestService.executeSpeedTest('full')).pipe(
      map((events) => {
        return { data: events } as MessageEvent;
      }),
    );
  }
}
