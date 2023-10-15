import { Module } from '@nestjs/common';
import { SpeedTestModule } from './speed-test/speed-test.module';

@Module({
  imports: [SpeedTestModule],
})
export class AppModule {}
