import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Comment from '@app/database-type-orm/entities/Comment.entity';
import User from '@app/database-type-orm/entities/User';
import { LikeCommentController } from './likeComment.controller';
import { LikeCommentService } from './likeComment.sevice';
import LikeComment from '@app/database-type-orm/entities/likeComment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Comment, LikeComment])],
  controllers: [LikeCommentController],
  providers: [LikeCommentService],
})
export class LikeCommentModule {}
