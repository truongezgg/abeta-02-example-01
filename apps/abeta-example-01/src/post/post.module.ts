import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@app/database-type-orm/entities/Post.entity';
import { RequestMakeFriend } from '@app/database-type-orm/entities/ReuestMakeFriend.entity';
import { RequestMakeFriendModule } from '../request_make_friend/request_make_friend.module';
import { ImageModule } from '../image/image.module';
import { PostImage } from '@app/database-type-orm/entities/postImage.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Post, RequestMakeFriend, PostImage]),
    RequestMakeFriendModule,
    ImageModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
