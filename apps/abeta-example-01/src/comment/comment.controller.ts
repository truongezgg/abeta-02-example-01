import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CommentDto } from './dto/comment.dto';
import { AuthUser } from '../auth/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth()
@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create')
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

  @Post('edit/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @AuthUser() { id },
    @Param('id') commentId: string,
    @UploadedFile() image: Express.Multer.File,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const userId = +id;
    return this.commentService.update(
      +commentId,
      updateCommentDto,
      userId,
      image,
    );
  }

  @Get(':id')
  findOne(@Param('id') commentId: string) {
    return this.commentService.findOne(+commentId);
  }

  @Delete(':id')
  remove(@AuthUser() { id }, @Param('id') commentId: string) {
    const userId = +id;
    return this.commentService.remove(+commentId, userId);
  }
}
