import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from '@app/jwt-authentication/jwt-authentication.decorator';
import { JwtAuthenticationService } from '@app/jwt-authentication';

class Payload {
  username: string;
  password: string;
}
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtAuthenticate: JwtAuthenticationService,
  ) {}

  @Public()
  @Post('/signin')
  async signIn(@Body() payload: Payload) {
    return this.userService.validateUser(payload.username, payload.password);
  }
}

/*
{
  "name":"tester1",
  "password":"12345"
}
*/
