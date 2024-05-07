import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '@app/database-type-orm/entities/User';
import { Repository } from 'typeorm';
import { JwtAuthenticationService } from '@app/jwt-authentication';
import { LoginAuthDto, RegisterAuthDto } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { Exception } from '@app/core/exception';
import { ErrorCode } from '@app/core/constants/enum';
import { UserService } from '../user/user.service';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtAuthService: JwtAuthenticationService,
    private userService: UserService,
  ) {}

  public async register(registerDto: RegisterAuthDto) {
    registerDto.password = bcrypt.hashSync(
      registerDto.password,
      bcrypt.genSaltSync(),
    );
    const existedUser = await this.userRepository.findOneBy({
      email: registerDto.email,
    });
    if (existedUser) {
      throw new Exception(ErrorCode.Email_Already_Exist, 'Email already exist');
    }
    const resetToken = this.generateRandomResetToken();
    await this.userService.create({
      email: registerDto.email,
      password: registerDto.password,
      resetToken: resetToken,
    });
    const user = await this.userService.findOneByEmail(registerDto.email);
    return this.generateTokensAndSave(user);
  }

  public async login(loginDto: LoginAuthDto) {
    const existedUser = await this.userRepository.findOne({
      where: {
        email: loginDto.email,
      },
      select: {
        email: true,
        password: true,
        id: true,
        resetToken: true,
      },
    });
    if (
      !existedUser ||
      !bcrypt.compareSync(loginDto.password, existedUser.password)
    ) {
      throw new Exception(
        ErrorCode.Email_Or_Password_Not_valid,
        'Email or password not valid',
      );
    }
    return this.generateTokensAndSave(existedUser);
  }

  async getProfile(req: Request) {
    const token = this.jwtAuthService.extractFromAuthHeaderAsBearerToken(req);
    const info = this.jwtAuthService.verifyAccessToken(token);
    return info['email'];
  }

  public generateRandomResetToken() {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    const length = 100;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
    return token;
  }

  public comparePassword(dtoPassword: string, userPassword: string): boolean {
    return bcrypt.compareSync(dtoPassword, userPassword);
  }

  public async generateTokensAndSave(user: User) {
    const accessToken = this.jwtAuthService.generateAccessToken({
      id: user.id,
      email: user.email,
      resetToken: user.resetToken,
    });
    const refreshToken = this.jwtAuthService.generateRefreshToken({
      id: user.id,
      email: user.email,
      resetToken: user.resetToken,
    });
    await this.userService.update(user.id, {
      refreshToken,
    });
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
