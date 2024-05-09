import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Repository } from 'typeorm';
import User from '@app/database-type-orm/entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '@app/database-type-orm/entities/Post.entity';
import Comment from '@app/database-type-orm/entities/Comment.entity';
import { CommentDto } from './dto/comment.dto';
import { Exception } from '@app/core/exception';
import { ErrorCode } from '@app/core/constants/enum';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const userId = 1;
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Exception(ErrorCode.User_Not_Found);
    }
    const post = await this.postRepository.findOne({
      where: { id: createCommentDto.postId, deletedAt: null },
    });

    if (!post) {
      throw new Exception(ErrorCode.Post_Not_Found);
    }

    const cmt = {
      user: user,
      post: post,
      content: createCommentDto.content,
    };

    await this.commentRepository.save(cmt);
    return {
      data: cmt,
    };
  }

  async findAll(commentDto: CommentDto) {
    const comment = await this.commentRepository.find({
      where: {
        postId: +commentDto.postId,
        deletedAt: null,
      },
      relations: ['user', 'post'],
    });
    return {
      data: {
        comment,
      },
    };
  }

  async findOne(commentId: number) {
    const comment = await this.commentRepository.findOne({
      where: {
        id: commentId,
        deletedAt: null,
      },
      relations: ['user', 'post'],
    });
    if (!comment) {
      throw new Exception(ErrorCode.Comment_Not_Found);
    }
    return {
      data: {
        comment,
      },
    };
  }

  async update(commentId: number, updateCommentDto: UpdateCommentDto) {
    const userId = 1;
    const comment = await this.commentRepository.findOne({
      where: {
        id: commentId,
        user: {
          id: userId,
        },
        deletedAt: null,
      },
      relations: ['user', 'post'],
    });
    if (comment) {
      await this.commentRepository.update(commentId, updateCommentDto);
      comment.content = updateCommentDto.content;
      return {
        data: {
          comment,
        },
      };
    } else {
      throw new Exception(ErrorCode.Comment_Not_Found);
    }
  }

  async remove(commentId: number) {
    const userId = 1;
    const comment = await this.commentRepository.findOne({
      where: {
        id: commentId,
        user: {
          id: userId,
        },
        deletedAt: null,
      },
    });
    if (comment) {
      await this.commentRepository.update(commentId, {
        deletedAt: new Date().toISOString(),
      });
      return `This action removes a #${commentId} comment`;
    } else throw new Exception(ErrorCode.Comment_Not_Found);
  }
}
