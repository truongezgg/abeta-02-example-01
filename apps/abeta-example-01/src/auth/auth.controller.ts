import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginAuthDto, RegisterAuthDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Public } from '@app/core/decorators/public.decorator';
import { ForgetPasswordDto } from './dtos/forgetPassword.dto';
import { ResetPasswordDto } from './dtos/resetPassword.dto';
import { AuthUser } from './decorators/user.decorator';
import { ChangePasswordDto } from './dtos/changePassword.dto';
import { OTPCategory } from "@app/core/constants/enum";
import { VerifyDto } from "./dtos/verify.dto";

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterAuthDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginAuthDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  getProfile(@AuthUser() payload: any) {
    return this.authService.getProfile(payload);
  }

  @Public()
  @Post('forget')
  forgetPassword(@Body() forgetDto: ForgetPasswordDto) {
    return this.authService.forgetPassword(forgetDto);
  }

  @Public()
  @Post('reset-password')
  resetPassword(@Body() resetDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetDto);
  }

  @Post('change-password')
  changePassword(@AuthUser() { id }, @Body() changeDto: ChangePasswordDto) {
    return this.authService.changePassword(id, changeDto);
  }

  @Put('refresh')
  refreshToken(@Req() req: Request) {
    const refreshToken = req.headers.authorization
      .trim()
      .replace('Bearer ', '');
    return this.authService.refreshTokens(refreshToken);
  }

  @Post('verify')
  verifyAccount(@AuthUser() user, verifyDto: VerifyDto) {
    return this.authService.verifyAccount(user, verifyDto.otp);
  }

  @Post('send-mail-verify')
  sendMailVerify(@AuthUser() user){
    return this.authService.sendOtp(user, OTPCategory.REGISTER);
  }
}
