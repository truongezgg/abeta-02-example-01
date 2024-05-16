import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import User from '@app/database-type-orm/entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import Comment from '@app/database-type-orm/entities/Comment.entity';
import { Exception } from '@app/core/exception';
import { CommonStatus, ErrorCode, IsCurrent } from "@app/core/constants/enum";
import LikeComment from '@app/database-type-orm/entities/likeComment.entity';
import { assignPaging, returnPaging } from '@app/helpers/utils';
import { NotificationService } from '../notification/notification.service';
import UserImage from '@app/database-type-orm/entities/UserImage.entity';

@Injectable()
export class LikeCommentService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(LikeComment)
    private readonly likeCommentRepository: Repository<LikeComment>,
    @InjectRepository(UserImage)
    private readonly userImageRepository: Repository<UserImage>,
    private notificationService: NotificationService,
  ) {}

  async postLike(userId, commentId) {
    const comment = await this.commentRepository.findOne({
      where: {
        id: +commentId,
        status: CommonStatus.ACTIVE,
      },
    });

    if (!comment) {
      throw new Exception(ErrorCode.Comment_Not_Found);
    }

    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Exception(ErrorCode.User_Not_Found);
    }

    const likeComment = await this.likeCommentRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        comment: {
          id: commentId,
        },
      },
      withDeleted: true,
    });

    if (!likeComment) {
      const likeCmt = {
        user: user,
        comment: comment,
      };

      await this.likeCommentRepository.save(likeCmt);
      this.notificationService.create(userId, {
        title: 'Facebook',
        content: `${user.name} đã like bình luận của bạn`,
        receiverId: comment.userId,
        categoryId: 2,
      });
      return {
        success: true,
        status: HttpStatus.CREATED,
        message: 'OK',
        payload: 'Liked the comment successfully!',
      };
    }

    if (likeComment.status === CommonStatus.ACTIVE) {
      await this.likeCommentRepository.update(likeComment.id, {
        status: CommonStatus.INACTIVE,
        deletedAt: new Date().toISOString(),
      });
      return {
        success: true,
        status: HttpStatus.CREATED,
        message: 'OK',
        payload: 'Remove liked the comment successfully',
      };
    }

    if (likeComment.status === CommonStatus.INACTIVE) {
      await this.likeCommentRepository.update(likeComment.id, {
        status: CommonStatus.ACTIVE,
      });
      this.notificationService.create(userId, {
        title: 'Facebook',
        content: `${user.name} đã like bình luận của bạn`,
        receiverId: comment.userId,
        categoryId: 2,
      });
      return {
        success: true,
        status: HttpStatus.CREATED,
        message: 'OK',
        payload: 'Liked the comment successfully!',
      };
    }
  }

  async findUsersLikeComment(userLikeCommentDto) {
    const params = assignPaging(userLikeCommentDto);

    const likeComments = await this.likeCommentRepository
      .createQueryBuilder('like_comment')
      .withDeleted()
      .leftJoinAndSelect('like_comment.user', 'user')
      .leftJoinAndSelect('like_comment.comment', 'comment')
      .leftJoinAndSelect('comment.post', 'post')
      .where('like_comment.commentId = :commentId', {
        commentId: userLikeCommentDto.commentId,
      })
      .andWhere('comment.status = :commentStatus', {
        commentStatus: CommonStatus.ACTIVE,
      })
      .andWhere('like_comment.status = :like_commentStatus', {
        like_commentStatus: CommonStatus.ACTIVE,
      })
      .andWhere('comment.status = :commentStatus', {
        commentStatus: CommonStatus.ACTIVE,
      })
      .andWhere('post.status = :postStatus', {
        postStatus: CommonStatus.ACTIVE,
      })
      .select(['like_comment', 'user.id', 'user.name'])
      .skip(params.skip)
      .take(params.pageSize)
      .getMany();

    console.log(likeComments);

    likeComments.forEach(async (likeCmt, i) => {
      const userImage = await this.userImageRepository.findOne({
        where: { userId: +likeCmt.userId, isCurrentAvatar: IsCurrent.IS_CURRENT},
        select: ['url'],
      });
      const user = {
        ...likeCmt.user,
        avatar: userImage.url,
      };
      likeCmt.user = user;
    });

    const totalLikeComments = await this.likeCommentRepository.count({
      where: {
        commentId: userLikeCommentDto.commentId,
        status: CommonStatus.ACTIVE,
      },
      withDeleted: true,
    });

    const pagingResult = returnPaging(likeComments, totalLikeComments, params);

    return pagingResult;
  }
}
