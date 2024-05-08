import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { CommentDto } from './dto/comment.dto';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
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
    @Param('id') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.update(+commentId, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') commentId: string) {
    return this.commentService.remove(+commentId);
  }
}
