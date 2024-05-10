/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRequestMakeFriendDto } from './dto/create-request_make_friend.dto';
import { UpdateRequestMakeFriendDto } from './dto/update-request_make_friend.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestMakeFriend } from '@app/database-type-orm/entities/ReuestMakeFriend.entity';
import User from '@app/database-type-orm/entities/User';
@Injectable()
export class RequestMakeFriendService {
  constructor(
    @InjectRepository(RequestMakeFriend)
    private requestMakeFriendRepository: Repository<RequestMakeFriend>,
    @InjectRepository(User)
    private userRepository: Repository<RequestMakeFriend>,
  ) {}

  // gui loi moi ket ban
  create(createRequestMakeFriendDto: CreateRequestMakeFriendDto) {
    try {
      const creater = this.requestMakeFriendRepository.create(
        createRequestMakeFriendDto,
      );

      const result = this.requestMakeFriendRepository.save(creater);
      return result;
      // console.log(creater);
    } catch {
      throw new HttpException(
        'Internal Server',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // lay danh sasch ban be cua 1 nguoi
  async findAll(page: number = 1, pageSize: number = 10, userId: number) {
    try {
      const skip = (page - 1) * pageSize;
      const [allPost, count] = await this.userRepository
        .createQueryBuilder('user')
        .innerJoinAndSelect(
          'user.requestSender',
          'request_make_friend',
          'request_make_friend.sender_id = :id OR request_make_friend.receiver_id = :id ',
          {
            id: userId,
          },
        )
        .andWhere('request_make_friend.status = :check', {
          check: 1,
        })
        .take(pageSize)
        .skip(skip)
        .getManyAndCount();
      return {
        arrayPosts: allPost,
        countPosts: count,
      };
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} requestMakeFriend`;
  }

  update(id: number, updateRequestMakeFriendDto: UpdateRequestMakeFriendDto) {
    return `This action updates a #${id} requestMakeFriend`;
  }

  remove(id: number) {
    return `This action removes a #${id} requestMakeFriend`;
  }
}
