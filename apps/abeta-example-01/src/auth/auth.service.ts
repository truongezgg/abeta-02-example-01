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
import EmailOtp from '@app/database-type-orm/entities/EmailOtp.entity';
import { ForgetPasswordDto } from './dtos/forgetPassword.dto';
import { ResetPasswordDto } from './dtos/ResetPassword.dto';
import { CheckOtpDto } from './dtos/CheckOtp.dto';
import { isAfter, addMinutes } from 'date-fns';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(EmailOtp)
    private otpRepository: Repository<EmailOtp>,
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
    return await this.userService.findOneById(info['id']);
  }

  async forgetPassword(forgetDto: ForgetPasswordDto) {
    const existedUser = await this.userRepository.findOne({
      where: {
        email: forgetDto.email,
      },
    });
    if (!existedUser) {
      throw new Exception(ErrorCode.User_Not_Found, 'User Not Found');
    }
    const otpRecords = await this.otpRepository.find({
      where: {
        user_id: existedUser.id,
      },
    });
    for (const otpRecord of otpRecords) {
      otpRecord.isExpired = true;
      await this.otpRepository.save(otpRecord);
    }
    const otp = Math.random().toString(20).substring(2, 12);
    await this.otpRepository.save({
      otp: otp,
      user_id: existedUser.id,
      isExpired: false,
    });
  }

  async checkOtp(checkOtpDto: CheckOtpDto) {
    const otp = await this.otpRepository.findOne({
      where: {
        otp: checkOtpDto.otp,
        isExpired: false,
      },
    });
    if (!otp) {
      throw new Exception(ErrorCode.OTP_Invalid);
    }
    const expiredTime = addMinutes(otp.createdAt, 5);
    if (isAfter(new Date(), expiredTime)) {
      throw new Exception(ErrorCode.OTP_Expired);
    }
    return {
      message: 'OTP is valid',
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const hashedPassword = await bcrypt.hash(resetPasswordDto.password, 12);
    const user = this.userService.findOneByEmail(resetPasswordDto.email);
    if (!user) {
      throw new Exception(ErrorCode.User_Not_Found);
    }
    await this.userRepository.update(
      { email: resetPasswordDto.email },
      { password: hashedPassword },
    );
    return {
      message: 'Reset Password Successfully',
    };
  }

  public async refreshTokens(refreshToken: string) {
    const user = this.jwtAuthService.verifyRefreshToken(refreshToken);
    if (!user) {
      throw new Exception(ErrorCode.User_Not_Found);
    }
    const newRefreshToken = this.jwtAuthService.generateRefreshToken({
      id: user.id,
      email: user.email,
      resetToken: user.resetToken,
    });
    await this.userService.updateRefreshToken(user.id, refreshToken);
    return { refreshToken: newRefreshToken };
  }
  private generateRandomResetToken() {
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

  private async generateTokensAndSave(user: User) {
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
