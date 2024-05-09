import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '@app/database-type-orm/entities/Post.entity';
import { Repository } from 'typeorm';
import { RequestMakeFriend } from '@app/database-type-orm/entities/ReuestMakeFriend.entity';
import { RequestMakeFriendService } from '../request_make_friend/request_make_friend.service';
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(RequestMakeFriend)
    private userRepository: Repository<RequestMakeFriend>,
    private requestMakeFriendService: RequestMakeFriendService,
  ) {}

  // tao bai post
  create(createPostDto: CreatePostDto, id: number) {
    try {
      const post = this.postRepository.create({
        ...createPostDto,
        userId: id,
      });

      const result = this.postRepository.save(post);
      // if (result) return 'This action adds a new post';
      return result;
    } catch {
      throw new HttpException(
        'Internal Server',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // lay tat ca cac bai post cua 1 ng
  async findAllMyPosts(
    page: number = 1,
    pageSize: number = 10,
    userId: number,
  ) {
    try {
      // const [data, total] = await this.postRepository.findAndCount({
      //   take: pageSize,
      //   skip: (page - 1) * pageSize,
      //   where: { userId },
      // });
      // return { data, total };
      const skip = (page - 1) * pageSize;
      const [allPost, count] = await this.postRepository
        .createQueryBuilder('post')
        .innerJoinAndSelect('post.user', 'user', 'user.id = :id', {
          id: userId,
        })
        .take(pageSize)
        .skip(skip)
        .getManyAndCount();
      return {
        arrayPosts: allPost,
        countPosts: count,
      };
    } catch {
      throw new HttpException(
        'Internal Server',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /// lasy tat ca cac bai post cua nhung ng da ket ban
  async findAllFriendPosts(userId: number, page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const allFriend = (
      await this.requestMakeFriendService.findAll(page, pageSize, userId)
    ).arrayPosts;
    const arrayNew = [];
    let sum = 0;
    if (allFriend.length > 0) {
      for (let i = 0; i < allFriend.length; i++) {
        const [all, count] = await this.postRepository
          .createQueryBuilder('post')
          .innerJoinAndSelect('post.user', 'user', 'user.id = :id', {
            id: allFriend[i].id,
          })
          .take(pageSize)
          .skip(skip)
          .getManyAndCount();
        arrayNew.push(all);
        sum += count;
      }
    }
    return {
      arrayPost: arrayNew,
      countPost: sum,
    };
  }

  findOne(id: number) {
    const result = this.postRepository.findOne({ where: { id } });

    return result;
  }

  deletePost(id: number, updatePostDto: UpdatePostDto) {
    const result = this.postRepository.update({ id }, updatePostDto);
    return result;
  }

  remove(id: number) {
    const result = this.postRepository.delete({ id });
    return result;
  }
}
