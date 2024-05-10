import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Comment from '@app/database-type-orm/entities/Comment.entity';
import User from '@app/database-type-orm/entities/User';
import { Post } from '@app/database-type-orm/entities/Post.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import CommentImage from '@app/database-type-orm/entities/CommentImage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Comment, Post, CommentImage]),
    MulterModule.register({
      storage: diskStorage({
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
          );
        },
      }),
    }),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
