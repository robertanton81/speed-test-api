import { Module } from '@nestjs/common';
import { SpeedTestService } from './speed-test.service';
import { SpeedTestController } from './speed-test.controller';
import { UtilsModule } from '@app/utils';

@Module({
  imports: [UtilsModule],
  controllers: [SpeedTestController],
  providers: [SpeedTestService],
})
export class SpeedTestModule {}
