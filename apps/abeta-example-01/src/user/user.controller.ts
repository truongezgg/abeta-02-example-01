
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
=======
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthenticationGuard } from '@app/jwt-authentication';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import User from '@app/database-type-orm/entities/User';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';

@ApiBearerAuth()
@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBody({ schema: { type: 'object', properties: {} } })
  @Patch('update/:id')
  async update(@Param('id') id: number, @Body() updateData: Partial<User>) {
    return this.userService.update(id, updateData);
  }

  @Get('getById/:id')
  async findOneById(@Param('id') id: number) {
    return this.userService.findOneById(id);
  }

  @Get('getByEmail/:email')
  async findOneByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const imageUrl = await this.userService.uploadImage(file);
    return {
      url: imageUrl,
    };
  }

}
*/
