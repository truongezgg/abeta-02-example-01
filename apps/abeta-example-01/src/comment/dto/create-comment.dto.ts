import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Allow, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: '' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ required: false, type: 'file' })
  @Allow()
  image: any;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  postId: number;
}
