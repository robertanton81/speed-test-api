import { Test, TestingModule } from '@nestjs/testing';
import { SpeedTestController } from './speed-test.controller';
import { SpeedTestService } from './speed-test.service';

describe('SpeedTestController', () => {
  let controller: SpeedTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpeedTestController],
      providers: [SpeedTestService],
    }).compile();

    controller = module.get<SpeedTestController>(SpeedTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
