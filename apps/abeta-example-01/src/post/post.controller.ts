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
import { AuthUser } from '../auth/decorators/user.decorator';

class requestUser {
  id: number;
  name: string;
}
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  //Create Post
  @ApiBearerAuth()
  @Post()
  create(@Body() createPostDto: CreatePostDto, @AuthUser() { id }) {
    return this.postService.create({ ...createPostDto }, id);
  }

  // Get all post of user
  @ApiBearerAuth()
  @Get()
  async findAll(
    @AuthUser() user: LiteralObject,
    @Query('page', ParseIntPipe) page?: number,
    @Query('pageSize', ParseIntPipe) pageSize?: number,
  ) {
    page = page || 1;
    pageSize = pageSize || 10;
    return this.postService.findAllMyPosts(page, pageSize, user.id);
  }

  //Get all post of friend
  @ApiBearerAuth()
  @Get('/friendpost')
  async findAllFriendPost(
    @User() user: LiteralObject,
    @Query('page', ParseIntPipe) page?: number,
    @Query('pageSize', ParseIntPipe) pageSize?: number,
  ) {
    page = page || 1;
    pageSize = pageSize || 10;
    return await this.postService.findAllFriendPosts(user.id, page, pageSize);
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
