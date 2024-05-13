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
import { CommonStatus, ErrorCode } from '@app/core/constants/enum';
import { v2 as cloudinary } from 'cloudinary';
import { assignPaging, returnPaging } from '@app/helpers/utils';
import CommentImage from '@app/database-type-orm/entities/CommentImage.entity';
import { NotificationService } from '../notification/notification.service';

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
    private notificationService: NotificationService,
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
      where: { id: createCommentDto.postId, status: CommonStatus.ACTIVE },
    });

    if (!post) {
      throw new Exception(ErrorCode.Post_Not_Found);
    }

    const cmt = {
      user: user,
      post: post,
      content: createCommentDto.content,
    };
    const comment = await this.commentRepository.save(cmt);

    let imageComment;
    if (image) {
      try {
        const result = await cloudinary.uploader.upload(image.path);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        imageComment = result.secure_url;
        console.log(imageComment);
      } catch (error) {
        throw new Error(`Failed to upload image: ${error.message}`);
      }
      const imageCmt = {
        commentId: comment.id,
        url: imageComment,
      };
      await this.commentImageRepository.save(imageCmt);
    }

    this.notificationService.create(userId, {
      title: 'Facebook',
      content: `${user.name} đã bình luận bài viết của bạn`,
      receiverId: post.userId,
    });

    return {
      ...comment,
      imageComment: imageComment,
    };
  }

  async findAll(commentDto: CommentDto) {
    const params = assignPaging(commentDto);
    const comment = await this.commentRepository.find({
      where: {
        postId: commentDto.postId,
        status: CommonStatus.ACTIVE,
      },
      relations: ['user', 'post'],
      skip: params.skip,
      take: params.pageSize,
    });

    const totalComments = await this.commentRepository.count({
      where: {
        postId: commentDto.postId,
        status: CommonStatus.ACTIVE,
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
        status: CommonStatus.ACTIVE,
      },
      relations: ['user', 'post'],
    });
    if (!comment) {
      throw new Exception(ErrorCode.Comment_Not_Found);
    }
    return {
      comment,
    };
  }

  async update(
    commentId: number,
    updateCommentDto: UpdateCommentDto,
    userId,
    image,
  ) {
    const comment = await this.commentRepository.findOne({
      where: {
        id: commentId,
        user: {
          id: userId,
        },
        status: CommonStatus.ACTIVE,
      },
      withDeleted: true,
      relations: ['user', 'post'],
    });

    if (comment) {
      await this.commentRepository.update(comment.id, {
        content: updateCommentDto.content,
      });
    } else {
      throw new Exception(ErrorCode.Comment_Not_Found);
    }

    comment.content = updateCommentDto.content;

    const image_comment = await this.commentImageRepository.findOne({
      where: {
        commentId: commentId,
        status: CommonStatus.ACTIVE,
      },
    });

    let url;
    if (image) {
      try {
        const result = await cloudinary.uploader.upload(image.path);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        url = result.secure_url;
      } catch (error) {
        throw new Error(`Failed to upload image: ${error.message}`);
      }
      if (!image_comment) {
        const imageCmt = {
          commentId: comment.id,
          url: url,
        };
        await this.commentImageRepository.save(imageCmt);
      }

      if (image_comment) {
        await this.commentImageRepository.update(image_comment.id, {
          url: url,
        });
      }
    }

    return {
      ...comment,
      imageComment: url,
    };
  }

  async remove(commentId: number, userId) {
    const comment = await this.commentRepository.findOne({
      where: {
        id: commentId,
        user: {
          id: userId,
        },
        status: CommonStatus.ACTIVE,
      },
    });
    if (comment) {
      await this.commentRepository.update(commentId, {
        status: CommonStatus.INACTIVE,
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
