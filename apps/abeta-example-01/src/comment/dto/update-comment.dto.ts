import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentDto {
  @Type(() => Number)
  @IsInt()
  id: number;

  @ApiProperty({ example: '' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
