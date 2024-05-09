/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '@app/database-type-orm/entities/User';
import { Repository } from 'typeorm';
import { Exception } from '@app/core/exception';
import { ErrorCode } from '@app/core/constants/enum';
import { JwtAuthenticationService } from '@app/jwt-authentication';
import { access } from 'fs';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private jwtAuthentication: JwtAuthenticationService,
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

  public async validateUser(username: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { name: username },
      select: ['id', 'email', 'phoneNumber', 'password', 'name'],
    });

    if (user && user.password === password) {
      const { password, ...result } = user;
      return {
        access_token: this.jwtAuthentication.generateAccessToken(result),
        refresh_token: this.jwtAuthentication.generateRefreshToken(result),
      };
    }

    return null;
  }
}
