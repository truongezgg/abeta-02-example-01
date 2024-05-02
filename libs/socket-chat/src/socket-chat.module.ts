import { Module } from '@nestjs/common';
import { SocketChatService } from './socket-chat.service';

@Module({
  providers: [SocketChatService],
  exports: [SocketChatService],
})
export class SocketChatModule {}
