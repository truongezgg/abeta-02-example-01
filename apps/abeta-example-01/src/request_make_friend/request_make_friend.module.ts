import { Module } from '@nestjs/common';
import { RequestMakeFriendService } from './request_make_friend.service';
import { RequestMakeFriendController } from './request_make_friend.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestMakeFriend } from '@app/database-type-orm/entities/ReuestMakeFriend.entity';
import User from '@app/database-type-orm/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([RequestMakeFriend, User])],
  controllers: [RequestMakeFriendController],
  providers: [RequestMakeFriendService],
  exports: [RequestMakeFriendService],
})
export class RequestMakeFriendModule {}
