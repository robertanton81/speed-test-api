import { Test, TestingModule } from '@nestjs/testing';
import { SpeedTestService } from '../speed-test.service';
import setTimeout = jest.setTimeout;
import { UtilsService } from '@app/utils';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../guards/roles.guard';

describe('SpeedTestService', () => {
  let service: SpeedTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpeedTestService,
        UtilsService,
        {
          provide: APP_GUARD,
          useClass: RolesGuard,
        },
      ],
    }).compile();

    service = module.get<SpeedTestService>(SpeedTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should exec test', async () => {
    service.executeSpeedTest('ping').subscribe((data) => {
      expect(data).toBeDefined();
    });
    setTimeout(200000);
  });

  it('should get server detail', async () => {
    service.getServerDetails().subscribe((data) => {
      expect(data).toBeDefined();
    });
    setTimeout(200000);
  });
});
