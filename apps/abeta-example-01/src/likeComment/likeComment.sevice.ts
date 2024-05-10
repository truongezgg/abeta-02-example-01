import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import User from '@app/database-type-orm/entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import Comment from '@app/database-type-orm/entities/Comment.entity';
import { Exception } from '@app/core/exception';
import { ErrorCode } from '@app/core/constants/enum';
import LikeComment from '@app/database-type-orm/entities/likeComment.entity';
import { assignPaging, returnPaging } from '@app/helpers/utils';

@Injectable()
export class LikeCommentService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(LikeComment)
    private readonly likeCommentRepository: Repository<LikeComment>,
  ) {}

  async postLike(userId, commentId) {
    const likeComment = await this.likeCommentRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        commentId: commentId,
      },
    });

    const comment = await this.commentRepository.findOne({
      where: {
        id: +commentId,
        deletedAt: null,
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

    if (!likeComment) {
      const likeCmt = {
        user: user,
        comment: comment,
      };

      await this.likeCommentRepository.save(likeCmt);
      throw new Exception('', '', HttpStatus.OK, 'Liked the post successfully');
    }

    if (likeComment) {
      await this.likeCommentRepository.remove(likeComment);
      throw new Exception(
        '',
        '',
        HttpStatus.OK,
        'Remove liked the post successfully',
      );
    }
  }

  async findUsersLikeComment(userLikeCommentDto) {
    const params = assignPaging(userLikeCommentDto);

    const likeComments = await this.likeCommentRepository.find({
      where: {
        commentId: userLikeCommentDto.commentId,
      },
      relations: ['user'],
      skip: params.skip,
      take: params.pageSize,
    });

    const totalLikeComments = await this.likeCommentRepository.count({
      where: {
        commentId: userLikeCommentDto.commentId,
        deletedAt: null,
      },
    });

    const pagingResult = returnPaging(likeComments, totalLikeComments, params);

    return {
      likesComment: pagingResult.data.map((likeCmt) => ({
        id: String(likeCmt.id),
        user: {
          name: likeCmt.user.name,
        },
      })),
    };
  }
}
