/* eslint-disable prettier/prettier */
import {
  // HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
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
  async create(createRequestMakeFriendDto: CreateRequestMakeFriendDto) {
    try {
      const creater = this.requestMakeFriendRepository.create({
        senderId: createRequestMakeFriendDto.senderId,
        receiverId: createRequestMakeFriendDto.receiverId,
      });

      const result = await this.requestMakeFriendRepository.save(creater);
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

  // lay danh sasch loi moi ket ban cua 1 nguoi
  async findAllMake(page: number = 1, pageSize: number = 10, userId: number) {
    try {
      const skip = (page - 1) * pageSize;
      const [allPost, count] = await this.requestMakeFriendRepository
        .createQueryBuilder('request_make_friend')
        .select([
          'request_make_friend.id',
          'request_make_friend.senderId',
          'request_make_friend.receiverId',
        ])
        .innerJoin('request_make_friend.receiver', 'user')
        .addSelect(['user.id', 'user.email', 'user.name'])
        .where(
          'request_make_friend.status = :check AND request_make_friend.receiverId = :receiver',
          {
            check: 0,
            receiver: userId,
          },
        )
        .take(pageSize)
        .skip(skip)
        .getManyAndCount();
      return {
        array: allPost,
        count: count,
      };
    } catch (error) {
      console.log(error);
    }
  }

  // lay danh sasch loi moi ket ban da gui cua 1 nguoi
  async findAllMade(page: number = 1, pageSize: number = 10, userId: number) {
    try {
      const skip = (page - 1) * pageSize;
      const [allPost, count] = await this.requestMakeFriendRepository
        .createQueryBuilder('request_make_friend')
        .select([
          'request_make_friend.id',
          'request_make_friend.senderId',
          'request_make_friend.receiverId',
        ])
        .innerJoin('request_make_friend.sender', 'user')
        .addSelect(['user.id', 'user.email', 'user.name'])
        .where(
          'request_make_friend.status = :check AND request_make_friend.senderId = :sender ',
          {
            check: 0,
            sender: userId,
          },
        )
        .take(pageSize)
        .skip(skip)
        .getManyAndCount();
      return {
        array: allPost,
        count: count,
      };
    } catch (error) {
      console.log(error);
    }
  }
  // lay danh sasch ban be cua 1 nguoi
  async findAllFriends(
    page: number = 1,
    pageSize: number = 10,
    userId: number,
  ) {
    try {
      const skip = (page - 1) * pageSize;
      const [allPost, count] = await this.requestMakeFriendRepository
        .createQueryBuilder('request_make_friend')
        .select([
          'request_make_friend.id',
          'request_make_friend.senderId',
          'request_make_friend.receiverId',
        ])
        .innerJoin('request_make_friend.sender', 'user')
        .addSelect(['user.id', 'user.email', 'user.name'])
        .where(
          'request_make_friend.status = :check AND (request_make_friend.senderId = :sender OR request_make_friend.receiverId = :receiver)',
          {
            check: 1,
            sender: userId,
            receiver: userId,
          },
        )
        .take(pageSize)
        .skip(skip)
        .getManyAndCount();
      return {
        array: allPost,
        count: count,
      };
    } catch (error) {
      console.log(error);
    }
  }
  findOne(id: number) {
    return `This action returns a #${id} requestMakeFriend`;
  }
  //nguoi gui xoa loi moi ket ban
  updateSender(
    id: number,
    userId: number,
    updateRequestMakeFriendDto: UpdateRequestMakeFriendDto,
  ) {
    try {
      const updater = this.requestMakeFriendRepository.update(
        { id, senderId: userId },
        updateRequestMakeFriendDto,
      );
      return updater;
    } catch {
      throw new HttpException(
        'Internal Server',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return `This action updates a #${id} requestMakeFriend`;
  }
  //nguoi xoa hoac chap nhan loi moi kp loi moi ket ban
  updateReceiver(
    id: number,
    userId: number,
    updateRequestMakeFriendDto: UpdateRequestMakeFriendDto,
  ) {
    try {
      const updater = this.requestMakeFriendRepository.update(
        { id, receiverId: userId },
        updateRequestMakeFriendDto,
      );
      return updater;
    } catch {
      throw new HttpException(
        'Internal Server',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return `This action updates a #${id} requestMakeFriend`;
  }
  remove(id: number) {
    return `This action removes a #${id} requestMakeFriend`;
  }
}
