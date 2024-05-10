import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class UserLikePostDto {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  postId: number;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  pageIndex: number;

  @ApiProperty({ example: 10 })
  @Type(() => Number)
  @IsInt()
  pageSize: number;
}
