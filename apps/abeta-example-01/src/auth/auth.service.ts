import { Injectable, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '@app/database-type-orm/entities/User';
import { Repository } from 'typeorm';
import { JwtAuthenticationService } from '@app/jwt-authentication';
import { LoginAuthDto, RegisterAuthDto } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { Exception } from '@app/core/exception';
import {
  ErrorCode,
  IsCurrent,
  OTPCategory,
  VerifiedStatus,
} from '@app/core/constants/enum';
import { UserService } from '../user/user.service';
import { Request } from 'express';
import EmailOtp from '@app/database-type-orm/entities/EmailOtp.entity';
import { ResetPasswordDto } from './dtos/resetPassword.dto';
import { addMinutes, format, subMinutes } from 'date-fns';
import { ForgetPasswordDto } from './dtos/forgetPassword.dto';
import { NodeMailerService } from '@app/node-mailer';
import { ChangePasswordDto } from './dtos/changePassword.dto';
import { Cron } from '@nestjs/schedule';
import { SendgridService } from '@app/sendgrid';
import * as process from 'process';
require('dotenv').config();
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(EmailOtp)
    private otpRepository: Repository<EmailOtp>,
    private jwtAuthService: JwtAuthenticationService,
    private userService: UserService,
    private mailService: NodeMailerService,
    private sendGridService: SendgridService,
  ) {}

  public async register(registerDto: RegisterAuthDto) {
    //check user existed or not
    const existedUser = await this.userRepository.findOneBy({
      email: registerDto.email,
    });
    if (existedUser) {
      throw new Exception(ErrorCode.Email_Already_Exist, 'Email already exist');
    }
    //create new password and resetToken
    const password = bcrypt.hashSync(
      registerDto.password,
      bcrypt.genSaltSync(),
    );
    const resetToken = this.generateRandomResetToken();
    //create user
    const user = await this.userRepository.create({
      email: registerDto.email,
      password: password,
      resetToken: resetToken,
    });
    const newUser = await this.userRepository.save(user);
    //send otp for verify
    try {
      await this.sendOtp(newUser, OTPCategory.REGISTER);
    } catch (Exception) {
      throw new Exception(ErrorCode.Cannot_Send_Mail);
    }
    //tokens
    return this.generateTokensAndSave(newUser);
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
    if (!existedUser) {
      throw new Exception(ErrorCode.Email_Not_Valid);
    }
    if (!bcrypt.compareSync(loginDto.password, existedUser.password)) {
      throw new Exception(ErrorCode.Password_Not_Valid);
    }
    return this.generateTokensAndSave(existedUser);
  }

  async getProfile(payload: any) {
    const user = this.userRepository.findOne({
      where: {
        id: payload.id,
      },
      select: ['email', 'name', 'phoneNumber', 'dateOfBirth', 'address'],
    });
    return user;
  }

  async forgetPassword(forgetDto: ForgetPasswordDto) {
    //check if user existed
    const existedUser = await this.userRepository.findOne({
      where: {
        email: forgetDto.email,
      },
    });
    if (!existedUser) {
      throw new Exception(ErrorCode.User_Not_Found, 'User Not Found');
    }
    //send otp
    await this.sendOtp(existedUser, OTPCategory.FORGET_PASSWORD);
    return {
      message: 'Check your email',
    };
  }

  async resetPassword(resetDto: ResetPasswordDto) {
    //check otp
    const otp = await this.otpRepository
      .createQueryBuilder('otp')
      .where('otp.otp = :otp', { otp: resetDto.otp })
      .andWhere('otp.isCurrent = :isCurrent', {
        isCurrent: IsCurrent.IS_CURRENT,
      })
      .andWhere('otp.category = :otpType', {
        otpType: OTPCategory.FORGET_PASSWORD,
      })
      .andWhere('otp.expiredAt > :now', { now: new Date() })
      .getOne();
    if (!otp) {
      throw new Exception(ErrorCode.OTP_Invalid);
    }
    const user = await this.userService.findOneById(otp.user_id);
    if (!user) {
      throw new Exception(ErrorCode.User_Not_Found);
    }
    const hashedPassword = await bcrypt.hash(
      resetDto.password,
      parseInt(process.env.BCRYPT_HASH_ROUND),
    );
    await this.userRepository.update(
      { id: otp.user_id },
      { password: hashedPassword },
    );
    await this.otpRepository.update(
      { otp: resetDto.otp },
      { isCurrent: IsCurrent.IS_OLD },
    );
    return {
      message: 'Reset Password Successfully',
    };
  }

  async changePassword(id: number, changeDto: ChangePasswordDto) {
    const existedUser = await this.userRepository.findOne({
      where: {
        id: id,
      },
      select: {
        email: true,
        password: true,
        resetToken: true,
      },
    });
    if (!existedUser) {
      throw new Exception(ErrorCode.User_Not_Found);
    }
    if (!bcrypt.compareSync(changeDto.oldPassword, existedUser.password)) {
      throw new Exception(ErrorCode.Password_Not_Valid);
    }
    const hashedPassword = await bcrypt.hash(
      changeDto.newPassword,
      parseInt(process.env.BCRYPT_HASH_ROUND),
    );
    await this.userRepository.update({ id: id }, { password: hashedPassword });
    return {
      message: 'Reset Password Successfully',
    };
  }

  async verifyAccount(user: User, otp: string) {
    const otpObject = await this.otpRepository
      .createQueryBuilder('otp')
      .where('otp.otp = :otp', { otp: otp })
      .andWhere('otp.isCurrent = :isCurrent', {
        isCurrent: IsCurrent.IS_CURRENT,
      })
      .andWhere('otp.category = :otpType', {
        otpType: OTPCategory.REGISTER,
      })
      .andWhere('otp.expiredAt > :now', { now: new Date() })
      .getOne();
    if (!otpObject) {
      throw new Exception(ErrorCode.OTP_Invalid);
    }
    await this.userService.update(user.id, {
      isVerified: VerifiedStatus.VERIFIED,
    });
    await this.otpRepository.update(
      { otp: otp },
      { isCurrent: IsCurrent.IS_OLD },
    );
    return {
      message: 'Verify Account Successfully',
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

  async sendOtp(user: User, otpType: number) {
    //check otp frequency
    const fiveMinutesAgo = subMinutes(new Date(), 5);
    const maxOtpInFiveMins = 5;
    const otpCountLastFiveMins = await this.otpRepository
      .createQueryBuilder('otp')
      .where('otp.user_id = :userId', { userId: user.id })
      .andWhere('otp.createdAt > :fiveMinutesAgo', { fiveMinutesAgo })
      .getCount();
    if (otpCountLastFiveMins >= maxOtpInFiveMins) {
      throw new Exception(ErrorCode.Too_Many_Requests);
    }
    //get current otp of user in data
    const otpRecords = await this.otpRepository
      .createQueryBuilder('otp')
      .where('otp.user_id = :userId', { userId: user.id })
      .andWhere('otp.isCurrent = :isCurrent', {
        isCurrent: IsCurrent.IS_CURRENT,
      })
      .andWhere('otp.category = :otpType', { otpType: otpType })
      .andWhere('otp.expiredAt > :now', { now: new Date() })
      .getMany();

    //change current status for that otp
    for (const otpRecord of otpRecords) {
      otpRecord.isCurrent = IsCurrent.IS_OLD;
      await this.otpRepository.save(otpRecord);
    }

    //create new otp
    const otp = Math.random().toString().substring(2, 8);
    const expiredAt = addMinutes(
      new Date(),
      parseInt(process.env.OTP_EXPIRY_TIME),
    );
    const expiredAtString = format(expiredAt, 'yyyy-MM-dd HH:mm:ss');
    const newOtp = this.otpRepository.create({
      otp: otp,
      user_id: user.id,
      email: user.email,
      isCurrent: IsCurrent.IS_CURRENT,
      category: otpType,
      expiredAt: expiredAtString,
    });
    await this.otpRepository.save(newOtp);

    //send
    await this.sendGridService.sendMail(
      user.email,
      otpType === OTPCategory.REGISTER
        ? 'Verify Your Account'
        : 'Reset Your Password',
      otpType === OTPCategory.REGISTER ? './verify' : './reset-password',
      { otp },
    );
    return {
      message: 'Check your email',
    };
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

  @Cron('0 20 * * *')
  async sendMailMaintenance() {
    const users = await this.userRepository.find({
      where: {
        deletedAt: null,
      },
    });
    for (const user of users) {
      await this.sendGridService.sendMail(
        user.email,
        'Under Maintenance',
        './maintenance',
      );
    }
  }
}
