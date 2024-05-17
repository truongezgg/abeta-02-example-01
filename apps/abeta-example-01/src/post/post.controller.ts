/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseInterceptors,
  ParseFilePipeBuilder,
  UploadedFiles,
  HttpStatus,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { User } from '@app/jwt-authentication/user.decorator';
import { LiteralObject } from '@nestjs/common/cache';
import { AuthUser } from '../auth/decorators/user.decorator';
import { Public } from '@app/jwt-authentication/jwt-authentication.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { title } from 'process';
import { ImageService } from '../image/image.service';
import { IsOptional } from 'class-validator';
import { OptionalFileInterceptor } from '../image/OptionalFileInterceptor.middleware';
import { OptionalParseFilePipe } from '../image/OptionalParseFilePipe.middleware';
class requestUser {
  id: number;
  name: string;
}
@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly imageService: ImageService,
  ) {}

  //Create Post
  @ApiBearerAuth()
  @Public()
  @Post('creater')
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
        title: {
          type: 'string',
        },
        content: {
          type: 'string',
        },
      },
    },
  })
  @UseInterceptors(OptionalFileInterceptor, FilesInterceptor('files'))
  async create(
    @UploadedFiles(OptionalParseFilePipe)
    files: Array<Express.Multer.File>,
    @Body() createPostDto: CreatePostDto,
    // @AuthUser() { id },
  ) {
    const image = await this.imageService.uploadImage(files);
    console.log(files);
    return await this.postService.create({ ...createPostDto }, 1, image);
  }

  // Get all post of user
  @Public()
  @ApiBearerAuth()
  @Get()
  async findAll(
    // @AuthUser() user: { id },
    @Query('page', ParseIntPipe) page?: number,
    @Query('pageSize', ParseIntPipe) pageSize?: number,
  ) {
    page = page || 1;
    pageSize = pageSize || 10;
    return this.postService.findAllMyPosts(page, pageSize, 1);
  }

  //Get all post of friend
  @Public()
  @ApiBearerAuth()
  @Get('/friendpost')
  async findAllFriendPost(
    @AuthUser() { id },
    @Query('page', ParseIntPipe) page?: number,
    @Query('pageSize', ParseIntPipe) pageSize?: number,
  ) {
    page = page || 1;
    pageSize = pageSize || 10;
    return await this.postService.findAllFriendPosts(id, page, pageSize);
  }

  // Review a Post
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: string, @AuthUser() user) {
    const post = await this.postService.findOne(parseInt(id), user.id);
    if (post === null)
      return {
        status: 'No data.',
      };
    else return post;
  }

  @ApiBearerAuth()
  @Patch('/delete/:id')
  async deletePost(@Param('id') id: string, @User() user) {
    const deleted = new Date().toISOString();
    const updated = new Date().toISOString();
    return await this.postService.deletePost(
      parseInt(id),
      deleted,
      updated,
      user.id,
    );
  }

  @ApiBearerAuth()
  @Patch('/update/:id')
  async updatePost(
    @Param('id') id: string,
    @User() user,
    @Body() updateDto: UpdatePostDto,
  ) {
    const updated = new Date().toISOString();
    return await this.postService.updatePost(
      parseInt(id),
      user.id,
      updated,
      updateDto,
    );
  }
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.postService.remove(+id);
  // }
}

/*
Test user
{
"name":"test1",
"password":"12345"
}

*/
