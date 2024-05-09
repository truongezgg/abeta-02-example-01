import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Comment from '@app/database-type-orm/entities/Comment.entity';
import User from '@app/database-type-orm/entities/User';
import { Post } from '@app/database-type-orm/entities/Post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Comment, Post])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
