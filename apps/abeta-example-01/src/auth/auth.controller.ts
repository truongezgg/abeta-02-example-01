import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';
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
    return payload;
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
}
