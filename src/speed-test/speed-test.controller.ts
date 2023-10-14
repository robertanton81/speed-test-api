import { Controller } from '@nestjs/common';
import { SpeedTestService } from './speed-test.service';

@Controller('speed-test')
export class SpeedTestController {
  constructor(private readonly speedTestService: SpeedTestService) {}
}
