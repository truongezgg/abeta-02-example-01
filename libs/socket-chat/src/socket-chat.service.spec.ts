import { Test, TestingModule } from '@nestjs/testing';
import { SocketChatService } from './socket-chat.service';

describe('SocketChatService', () => {
  let service: SocketChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketChatService],
    }).compile();

    service = module.get<SocketChatService>(SocketChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
