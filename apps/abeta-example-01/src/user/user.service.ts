import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '@app/database-type-orm/entities/User';
import { Repository } from 'typeorm';
import { Exception } from '@app/core/exception';
import { ErrorCode } from '@app/core/constants/enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async create(user: any) {
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
  }

  public async update(id: number, updateData: Partial<User>) {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new Exception(ErrorCode.User_Not_Found, 'User Not Found');
    }
    Object.assign(user, updateData);
    return this.userRepository.save(user);
  }

  public async findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email: email });
  }

  public async findOneById(id: number) {
    return this.userRepository.findOneBy({ id: id });
  }

  updateRefreshToken(id: number, refreshToken) {
    return this.userRepository.update(
      { id: id },
      { refreshToken: refreshToken },
    );
  }
}
