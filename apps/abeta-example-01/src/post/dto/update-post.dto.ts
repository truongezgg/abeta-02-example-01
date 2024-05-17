import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { IsDateString, IsOptional, MaxLength } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty({ example: 'update title' })
  @IsOptional()
  @MaxLength(255, { message: 'Title must not exceed 255 characters.' })
  title?: string;

  @ApiProperty({ example: 'update content' })
  @IsOptional()
  @MaxLength(500, { message: 'Title must not exceed 500 characters.' })
  content?: string;

  @IsOptional()
  deletedAt?: Date;

  @IsOptional()
  updatedAt?: Date;
}
