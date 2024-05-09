import { HttpStatus, Injectable } from '@nestjs/common';
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
import { v2 as cloudinary } from 'cloudinary';
import { assignPaging, returnPaging } from '@app/helpers/utils';
import CommentImage from '@app/database-type-orm/entities/CommentImage.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(CommentImage)
    private readonly commentImageRepository: Repository<CommentImage>,
  ) {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  }

  async create(
    userId,
    createCommentDto: CreateCommentDto,
    image?: Express.Multer.File,
  ) {
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
      image,
    };
    const comment = await this.commentRepository.save(cmt);

    let imageComment;
    if (image) {
      try {
        const result = await cloudinary.uploader.upload(image.path);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        imageComment = result.secure_url;
      } catch (error) {
        throw new Error(`Failed to upload image: ${error.message}`);
      }
      const imageCmt = {
        commentId: comment.id,
        url: imageComment,
      };
      await this.commentImageRepository.save(imageCmt);
    }

    return {
      data: {
        ...comment,
        imageComment: imageComment,
      },
    };
  }

  async findAll(commentDto: CommentDto) {
    const params = assignPaging(commentDto);
    const comment = await this.commentRepository.find({
      where: {
        postId: commentDto.postId,
        deletedAt: null,
      },
      relations: ['user', 'post'],
      skip: params.skip,
      take: params.pageSize,
    });

    const totalComments = await this.commentRepository.count({
      where: {
        postId: commentDto.postId,
        deletedAt: null,
      },
    });

    const pagingResult = returnPaging(comment, totalComments, params);
    return {
      comments: pagingResult,
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

  async update(commentId: number, updateCommentDto: UpdateCommentDto, userId) {
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

  async remove(commentId: number, userId) {
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
      throw new Exception(
        '',
        '',
        HttpStatus.OK,
        'Remove a comment successfully',
      );
    } else throw new Exception(ErrorCode.Comment_Not_Found);
  }
}
