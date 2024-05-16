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
import { CommonStatus, ErrorCode, IsCurrent } from "@app/core/constants/enum";
import { v2 as cloudinary } from 'cloudinary';
import { assignPaging, returnPaging } from '@app/helpers/utils';
import CommentImage from '@app/database-type-orm/entities/CommentImage.entity';
import { NotificationService } from '../notification/notification.service';
import UserImage from '@app/database-type-orm/entities/UserImage.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(UserImage)
    private readonly userImageRepository: Repository<UserImage>,
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
      categoryId: 1,
    });

    return {
      success: true,
      status: HttpStatus.CREATED,
      message: 'OK',
      payload: 'Create A Comment Successfully!',
    };
  }

  async findAll(commentDto: CommentDto) {
    const params = assignPaging(commentDto);
    const comments = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoinAndSelect('comment.post', 'post', 'post.status = :postStatus')
      .where('comment.postId = :postId', { postId: commentDto.postId })
      .andWhere('comment.status = :status', { status: CommonStatus.ACTIVE })
      .andWhere('post.status = :postStatus', {
        postStatus: CommonStatus.ACTIVE,
      })
      .select(['comment', 'user.id', 'user.name'])
      .skip(params.skip)
      .take(params.pageSize)
      .getMany();

    comments.forEach(async (cmt, i) => {
      const userImage = await this.userImageRepository.findOne({
        where: { userId: +cmt.userId, isCurrentAvatar: IsCurrent.IS_CURRENT },
        select: ['url'],
      });
      const user = {
        ...cmt.user,
        avatar: userImage.url,
      };
      cmt.user = user;
    });

    const totalComments = await this.commentRepository.count({
      where: {
        postId: commentDto.postId,
        status: CommonStatus.ACTIVE,
      },
    });

    const pagingResult = returnPaging(comments, totalComments, params);
    return pagingResult;
  }

  async findOne(commentId: number) {
    const comment = await this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.id = :commentId', { commentId })
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoinAndSelect('comment.post', 'post')
      .andWhere('comment.status = :status', { status: CommonStatus.ACTIVE })
      .andWhere('post.status = :postStatus', {
        postStatus: CommonStatus.ACTIVE,
      })
      .select(['comment', 'user.id', 'user.name'])
      .getOne();
    if (!comment) {
      throw new Exception(ErrorCode.Comment_Not_Found);
    }

    const userImage = await this.userImageRepository.findOne({
      where: { userId: +comment.userId },
      select: ['url'],
    });

    const user = {
      ...comment.user,
      avatar: userImage.url,
    };
    comment.user = user;

    return comment;
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
      success: true,
      status: HttpStatus.CREATED,
      message: 'OK',
      payload: 'Update A Comment Successfully!',
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

      return {
        success: true,
        status: HttpStatus.OK,
        message: 'OK',
        payload: 'Remove a comment successfully!',
      };
    } else throw new Exception(ErrorCode.Comment_Not_Found);
  }
}
