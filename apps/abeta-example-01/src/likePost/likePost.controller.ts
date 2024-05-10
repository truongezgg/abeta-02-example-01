import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { AuthUser } from '../auth/decorators/user.decorator';
import { LikePostService } from './likePost.sevice';
import { LikePostDto } from './dto/likePost.dto';
import { UserLikePostDto } from './dto/userLikePost.dto';

@ApiTags('like Post')
@Controller('post/like')
@Auth()
export class LikePostController {
  constructor(private readonly likePostService: LikePostService) {}

  @Post()
  async like(@AuthUser() { id }, @Body() likePostDto: LikePostDto) {
    const userId = id;
    return this.likePostService.postLike(userId, likePostDto.postId);
  }

  @Post('users')
  async findUsersLikePost(@Body() userLikePostDto: UserLikePostDto) {
    return this.likePostService.findUsersLikePost(userLikePostDto);
  }
}
