import { Test, TestingModule } from '@nestjs/testing';
import { OnesignalNotificationService } from './onesignal-notification.service';

describe('OnesignalNotificationService', () => {
  let service: OnesignalNotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OnesignalNotificationService],
    }).compile();

    service = module.get<OnesignalNotificationService>(OnesignalNotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
