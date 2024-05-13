import { Test, TestingModule } from '@nestjs/testing';
import { RequestMakeFriendController } from './request_make_friend.controller';
import { RequestMakeFriendService } from './request_make_friend.service';

describe('RequestMakeFriendController', () => {
  let controller: RequestMakeFriendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestMakeFriendController],
      providers: [RequestMakeFriendService],
    }).compile();

    controller = module.get<RequestMakeFriendController>(RequestMakeFriendController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
