import { Exception } from '@app/core/exception';
import User from '@app/database-type-orm/entities/User';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SubscribeService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async saveSubscription(userId: number, subscriptionId) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    user.subscriptionId = subscriptionId;
    this.userRepository.save(user);
    throw new Exception('', '', HttpStatus.OK, 'OK');
  }
}
