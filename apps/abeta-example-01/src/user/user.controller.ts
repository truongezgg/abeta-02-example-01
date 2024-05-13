// import { Body, Controller, Post } from '@nestjs/common';
// import { UserService } from './user.service';
// import { Public } from '@app/jwt-authentication/jwt-authentication.decorator';
// import { JwtAuthenticationService } from '@app/jwt-authentication';
//
// class Payload {
//   username: string;
//   password: string;
// }
// @Controller('user')
// export class UserController {
//   constructor(
//     private userService: UserService,
//     private jwtAuthenticate: JwtAuthenticationService,
//   ) {}
//
//   @Public()
//   @Post('/signin')
//   async signIn(@Body() payload: Payload) {
//     return this.userService.validateUser(payload.username, payload.password);
//   }
// }

import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UploadedFiles,
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
  FilesInterceptor,
} from '@nestjs/platform-express';
import { AuthUser } from '../auth/decorators/user.decorator';

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

  @Post('upload-images')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @AuthUser() { id },
  ) {
    const imageUrl = await this.userService.uploadImages(files, id);
    return {
      url: imageUrl,
    };
  }


  @Post('upload-single-image')
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
  async uploadAvatar(@UploadedFile() file: Express.Multer.File, @AuthUser() {id}) {
    const imageUrl = await this.userService.uploadAvatar(file, id);
    return {
      url: imageUrl,
    };
  }
}
