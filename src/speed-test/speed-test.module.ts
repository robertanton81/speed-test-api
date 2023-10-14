import { Module } from '@nestjs/common';
import { SpeedTestService } from './speed-test.service';
import { SpeedTestController } from './speed-test.controller';

@Module({
  controllers: [SpeedTestController],
  providers: [SpeedTestService],
})
export class SpeedTestModule {}
