import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CommentDto } from './dto/comment.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { AuthUser } from '../auth/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('comment')
@Controller('comment')
@Auth()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @AuthUser() { id },
    @Body() createCommentDto: CreateCommentDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const userId = +id;
    return this.commentService.create(userId, createCommentDto, image);
  }

  @Post('all')
  findAll(@Body() commentDto: CommentDto) {
    return this.commentService.findAll(commentDto);
  }

  @Get(':id')
  findOne(@Param('id') commentId: string) {
    return this.commentService.findOne(+commentId);
  }

  @Patch(':id')
  update(
    @AuthUser() { id },
    @Param('id') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const userId = +id;
    return this.commentService.update(+commentId, updateCommentDto, userId);
  }

  @Delete(':id')
  remove(@AuthUser() { id }, @Param('id') commentId: string) {
    const userId = +id;
    return this.commentService.remove(+commentId, userId);
  }
}
