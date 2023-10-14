import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpeedTestModule } from './speed-test/speed-test.module';

@Module({
  imports: [SpeedTestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
