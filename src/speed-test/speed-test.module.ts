import { Module } from '@nestjs/common';
import { SpeedTestService } from './speed-test.service';
import { SpeedTestController } from './speed-test.controller';
import { UtilsModule } from '@app/utils';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [UtilsModule],
  controllers: [SpeedTestController],
  providers: [
    SpeedTestService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class SpeedTestModule {}
