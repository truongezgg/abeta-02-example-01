import { Controller, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '../auth/decorators/user.decorator';
import { LikePostService } from './likePost.sevice';
import { LikePostDto } from './dto/likePost.dto';
import { UserLikePostDto } from './dto/userLikePost.dto';

@ApiBearerAuth()
@ApiTags('like Post')
@Controller('post/like')
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
