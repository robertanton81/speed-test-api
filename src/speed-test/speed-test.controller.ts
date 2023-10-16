import { Controller, Res, Sse } from '@nestjs/common';
import { SpeedTestService } from './speed-test.service';
import { map, Observable } from 'rxjs';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enums/roles.enum';
import { IEvents } from './types';
import { Response } from 'express';

@Controller()
export class SpeedTestController {
  private streamMap = new Map<string, Observable<IEvents | Error>>();

  constructor(private readonly speedTestService: SpeedTestService) {}

  @Sse('latency-test')
  executeLatencyTest(@Res() response: Response): Observable<MessageEvent> {
    const id = SpeedTestController.genStreamId();

    response.on('close', () => {
      this.removeStream(id);
    });

    const observer = this.speedTestService.executeSpeedTest('ping');
    this.addStream(observer, id);

    return observer.pipe(
      map((events) => {
        return { data: events } as MessageEvent;
      }),
    );
  }

  @Sse('download-test')
  executeDownloadTest(@Res() response: Response): Observable<MessageEvent> {
    const id = SpeedTestController.genStreamId();

    response.on('close', () => {
      this.removeStream(id);
    });

    const observer = this.speedTestService.executeSpeedTest('download');
    this.addStream(observer, id);

    return observer.pipe(
      map((events) => {
        return { data: events } as MessageEvent;
      }),
    );
  }

  @Sse('upload-test')
  executeUploadTest(@Res() response: Response): Observable<MessageEvent> {
    const id = SpeedTestController.genStreamId();

    response.on('close', () => {
      this.removeStream(id);
    });

    const observer = this.speedTestService.executeSpeedTest('upload');
    this.addStream(observer, id);

    return observer.pipe(
      map((events) => {
        return { data: events } as MessageEvent;
      }),
    );
  }

  @Sse('full-test')
  // it will throw 403 every time, because login and authentication is not implemented
  // to test, just comment out the @Roles decorator
  @Roles(Role.Private)
  executeFullTest(@Res() response: Response): Observable<MessageEvent> {
    const id = SpeedTestController.genStreamId();

    response.on('close', () => {
      this.removeStream(id);
    });

    const observer = this.speedTestService.executeSpeedTest('full');
    this.addStream(observer, id);

    return observer.pipe(
      map((events) => {
        return { data: events } as MessageEvent;
      }),
    );
  }

  private addStream(observer: Observable<IEvents | Error>, id: string): void {
    this.streamMap.set(id, observer);
  }

  private removeStream(id: string): void {
    this.streamMap.delete(id);
  }

  private getStream(id: string): Observable<IEvents | Error> {
    return this.streamMap.get(id);
  }

  private static genStreamId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}
