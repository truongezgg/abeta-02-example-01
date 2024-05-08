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

@UseGuards(JwtAuthenticationGuard)
@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBearerAuth()
  @ApiBody({ schema: { type: 'object', properties: {} } })
  @Patch('update/:id')
  async update(@Param('id') id: number, @Body() updateData: Partial<User>) {
    return this.userService.update(id, updateData);
  }

  @ApiBearerAuth()
  @Get('getById/:id')
  async findOneById(@Param('id') id: number) {
    return this.userService.findOneById(id);
  }

  @ApiBearerAuth()
  @Get('getByEmail/:email')
  async findOneByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

  @ApiBearerAuth()
  @Post()
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
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
