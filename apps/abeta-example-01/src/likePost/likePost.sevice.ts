import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import User from '@app/database-type-orm/entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '@app/database-type-orm/entities/Post.entity';
import { Exception } from '@app/core/exception';
import { CommonStatus, ErrorCode } from '@app/core/constants/enum';
import { assignPaging, returnPaging } from '@app/helpers/utils';
import { LikedPost } from '@app/database-type-orm/entities/LikedPost.entity';

@Injectable()
export class LikePostService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(LikedPost)
    private readonly likedPostRepository: Repository<LikedPost>,
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
      throw new Exception('', '', HttpStatus.OK, 'Liked the post successfully');
    }

    if (likedPost.status === CommonStatus.ACTIVE) {
      await this.likedPostRepository.update(likedPost.id, {
        status: CommonStatus.INACTIVE,
        deletedAt: new Date().toISOString(),
      });
      throw new Exception(
        '',
        '',
        HttpStatus.OK,
        'Remove liked the post successfully',
      );
    }

    if (likedPost.status === CommonStatus.INACTIVE) {
      await this.likedPostRepository.update(likedPost.id, {
        status: CommonStatus.ACTIVE,
      });
      throw new Exception('', '', HttpStatus.OK, 'Liked the post successfully');
    }
  }

  async findUsersLikePost(userLikePostDto) {
    const params = assignPaging(userLikePostDto);

    const likePosts = await this.likedPostRepository.find({
      where: {
        postId: userLikePostDto.postId,
        status: CommonStatus.ACTIVE,
      },
      relations: ['user'],
      withDeleted: true,
      skip: params.skip,
      take: params.pageSize,
    });

    const totalLikePosts = await this.likedPostRepository.count({
      where: {
        postId: userLikePostDto.postId,
        status: CommonStatus.ACTIVE,
      },
    });

    const pagingResult = returnPaging(likePosts, totalLikePosts, params);

    return {
      likesPost: pagingResult.data.map((like) => ({
        id: String(like.id),
        user: {
          name: like.user.name,
        },
      })),
    };
  }
}
