import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginAuthDto, RegisterAuthDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request } from 'express';
import { JwtAuthenticationGuard } from '@app/jwt-authentication';
import { Public } from '@app/core/decorators/public.decorator';

@UseGuards(JwtAuthenticationGuard)
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

  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Req() req: Request) {
    return this.authService.getProfile(req);
  }
}
