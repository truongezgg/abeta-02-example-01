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
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '@app/jwt-authentication/user.decorator';
import { LiteralObject } from '@nestjs/common/cache';

class requestUser {
  id: number;
  name: string;
}
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiBearerAuth()
  @Post()
  create(@Body() createPostDto: CreatePostDto, @User() user: requestUser) {
    return this.postService.create({ ...createPostDto }, user.id);
  }

  @ApiBearerAuth()
  @Get()
  async findAll(
    @User() user: LiteralObject,
    @Query('page', ParseIntPipe) page?: number,
    @Query('pageSize', ParseIntPipe) pageSize?: number,
  ) {
    page = page || 1;
    pageSize = pageSize || 10;
    return this.postService.findAllMyPosts(page, pageSize, user.id);
  }

  @ApiBearerAuth()
  @Get('/friendpost')
  async findAllFriendPost(
    @User() user: LiteralObject,
    @Query('page', ParseIntPipe) page?: number,
    @Query('pageSize', ParseIntPipe) pageSize?: number,
  ) {
    page = page || 1;
    pageSize = pageSize || 10;
    return this.postService.findAllFriendPosts(user.id, page, pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}

/*
Test user
{
"name":"test1",
"password":"12345"
}

*/
