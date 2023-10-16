import { Controller, Res, Sse } from '@nestjs/common';
import { SpeedTestService } from './speed-test.service';
import { map, Observable } from 'rxjs';
import { Response } from 'express';
import { ApiOkResponse } from '@nestjs/swagger';
import { LatencyTestResultDto } from './dtos/results';
import { Role } from './enums/roles.enum';
import { Roles } from './decorators/roles.decorator';

@Controller()
export class SpeedTestController {
  private streamMap = new Map<string, Observable<unknown | Error>>();

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

  @ApiOkResponse({
    description: 'Download speed test',
    type: LatencyTestResultDto,
  })
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
  // @Roles(Role.Public)
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

  // it will throw 403 every time, because login and authentication is not implemented
  // to test, just comment out the @Roles decorator
  @Roles(Role.Private)
  @Sse('server-details')
  executeServerDetails(@Res() response: Response): Observable<MessageEvent> {
    const id = SpeedTestController.genStreamId();

    response.on('close', () => {
      this.removeStream(id);
    });

    const observer = this.speedTestService.getServerDetails();
    this.addStream(observer, id);

    return observer.pipe(
      map((serverDetails) => {
        return { data: serverDetails } as MessageEvent;
      }),
    );
  }

  private addStream(observer: Observable<unknown>, id: string): void {
    this.streamMap.set(id, observer);
  }

  private removeStream(id: string): void {
    this.streamMap.delete(id);
  }

  private getStream(id: string): Observable<unknown> {
    return this.streamMap.get(id);
  }

  private static genStreamId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}
