import { Test, TestingModule } from '@nestjs/testing';
import { SpeedTestService } from './speed-test.service';
import setTimeout = jest.setTimeout;
import { UtilsService } from '@app/utils';

describe('SpeedTestService', () => {
  let service: SpeedTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpeedTestService, UtilsService],
    }).compile();

    service = module.get<SpeedTestService>(SpeedTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should exec', async () => {
    await service.executeSpeedTest();
    setTimeout(200000);

    expect(true).toBe(true);
  });
});
