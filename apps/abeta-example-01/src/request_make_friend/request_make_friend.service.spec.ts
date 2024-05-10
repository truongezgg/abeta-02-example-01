import { Test, TestingModule } from '@nestjs/testing';
import { RequestMakeFriendService } from './request_make_friend.service';

describe('RequestMakeFriendService', () => {
  let service: RequestMakeFriendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestMakeFriendService],
    }).compile();

    service = module.get<RequestMakeFriendService>(RequestMakeFriendService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
