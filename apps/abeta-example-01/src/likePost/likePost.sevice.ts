import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import User from '@app/database-type-orm/entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '@app/database-type-orm/entities/Post.entity';
import { Exception } from '@app/core/exception';
import { CommonStatus, ErrorCode } from '@app/core/constants/enum';
import { assignPaging, returnPaging } from '@app/helpers/utils';
import { LikedPost } from '@app/database-type-orm/entities/LikedPost.entity';
import { NotificationService } from '../notification/notification.service';
import UserImage from '@app/database-type-orm/entities/UserImage.entity';

@Injectable()
export class LikePostService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(LikedPost)
    private readonly likedPostRepository: Repository<LikedPost>,
    @InjectRepository(UserImage)
    private readonly userImageRepository: Repository<UserImage>,
    private notificationService: NotificationService,
  ) {}

  async postLike(userId, postId) {
    const post = await this.postRepository.findOne({
      where: {
        id: +postId,
        status: CommonStatus.ACTIVE,
      },
    });

    if (!post) {
      throw new Exception(ErrorCode.Post_Not_Found);
    }

    const user = await this.userRepository.findOne({
      where: {
        id: +userId,
      },
    });

    if (!user) {
      throw new Exception(ErrorCode.User_Not_Found);
    }

    const likedPost = await this.likedPostRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        post: {
          id: postId,
        },
      },
      withDeleted: true,
    });

    if (!likedPost) {
      const like_post = {
        user: user,
        post: post,
      };

      await this.likedPostRepository.save(like_post);
      this.notificationService.create(userId, {
        title: 'Facebook',
        content: `${user.name} đã like bài viết của bạn`,
        receiverId: post.userId,
        categoryId: 2,
      });
      return {
        success: true,
        status: HttpStatus.CREATED,
        message: 'OK',
        payload: 'Liked the post successfully',
      };
    }

    if (likedPost.status === CommonStatus.ACTIVE) {
      await this.likedPostRepository.update(likedPost.id, {
        status: CommonStatus.INACTIVE,
        deletedAt: new Date().toISOString(),
      });
      return {
        success: true,
        status: HttpStatus.CREATED,
        message: 'OK',
        payload: 'Remove liked the post successfully',
      };
    }

    if (likedPost.status === CommonStatus.INACTIVE) {
      await this.likedPostRepository.update(likedPost.id, {
        status: CommonStatus.ACTIVE,
      });
      this.notificationService.create(userId, {
        title: 'Facebook',
        content: `${user.name} đã like bài viết của bạn`,
        receiverId: post.userId,
        categoryId: 2,
      });
      return {
        success: true,
        status: HttpStatus.CREATED,
        message: 'OK',
        payload: 'Liked the post successfully',
      };
    }
  }

  async findUsersLikePost(userLikePostDto) {
    const params = assignPaging(userLikePostDto);

    const [likePosts, totalLikePosts] = await this.likedPostRepository
      .createQueryBuilder('like_post')
      .withDeleted()
      .leftJoinAndSelect('like_post.user', 'user')
      .leftJoinAndSelect('like_post.post', 'post')
      .leftJoinAndSelect('user.images', 'images')
      .where('like_post.postId = :postId', {
        postId: userLikePostDto.postId,
      })
      .andWhere('post.status = :postStatus', {
        postStatus: CommonStatus.ACTIVE,
      })
      .andWhere('like_post.status = :like_postStatus', {
        like_postStatus: CommonStatus.ACTIVE,
      })
      .select(['like_post', 'user.id', 'user.name', 'images.url'])
      .skip(params.skip)
      .take(params.pageSize)
      .getManyAndCount();

    const pagingResult = returnPaging(likePosts, totalLikePosts, params);

    return pagingResult;
  }
}
