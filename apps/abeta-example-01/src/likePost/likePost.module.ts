import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@app/database-type-orm/entities/Post.entity';
import User from '@app/database-type-orm/entities/User';
import { LikePostController } from './likePost.controller';
import { LikePostService } from './likePost.sevice';
import { LikedPost } from '@app/database-type-orm/entities/LikedPost.entity';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post, LikedPost]),
    NotificationModule,
  ],
  controllers: [LikePostController],
  providers: [LikePostService],
})
export class LikePostModule {}
