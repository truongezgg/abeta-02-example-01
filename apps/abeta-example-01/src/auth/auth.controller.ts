import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginAuthDto, RegisterAuthDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Public } from '@app/core/decorators/public.decorator';
import { ForgetPasswordDto } from './dtos/forgetPassword.dto';
import { ResetPasswordDto } from './dtos/ResetPassword.dto';
import { CheckOtpDto } from './dtos/CheckOtp.dto';
import { UserPayload } from './decorators/user.decorators';

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
  getProfile(@UserPayload() payload: any) {
    return payload;
  }

  @Public()
  @Post('forget')
  forgetPassword(@Body() forgetDto: ForgetPasswordDto) {
    return this.authService.forgetPassword(forgetDto);
  }

  @Public()
  @Post('check-otp')
  checkOtp(@Body() checkOtpDto: CheckOtpDto) {
    return this.authService.checkOtp(checkOtpDto);
  }

  @Public()
  @Post('reset-password')
  resetPassword(@Body() resetDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetDto);
  }

  @Put('refresh')
  refreshToken(@Req() req: Request) {
    const refreshToken = req.headers.authorization
      .trim()
      .replace('Bearer ', '');
    return this.authService.refreshTokens(refreshToken);
  }
}
