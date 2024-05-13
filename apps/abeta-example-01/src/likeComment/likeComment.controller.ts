import { Controller, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '../auth/decorators/user.decorator';
import { LikeCommentService } from './likeComment.sevice';
import { LikeCommentDto } from './dto/likeComment.dto';
import { UserLikeCommentDto } from './dto/userLikeComment.dto';

@ApiTags('like comment')
@Controller('comment/like')
@ApiBearerAuth()
export class LikeCommentController {
  constructor(private readonly likeCommentService: LikeCommentService) {}

  @Post()
  async like(@AuthUser() { id }, @Body() likeCommentDto: LikeCommentDto) {
    const userId = id;
    return this.likeCommentService.postLike(userId, likeCommentDto.commentId);
  }

  @Post('users')
  async findUsersLikeComment(@Body() userLikeCommentDto: UserLikeCommentDto) {
    return this.likeCommentService.findUsersLikeComment(userLikeCommentDto);
  }
}
