import { ApiProperty } from '@nestjs/swagger';

import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRequestMakeFriendDto {
  @ApiProperty({ example: 0 })
  @IsNotEmpty()
  senderId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  receiverId: number;

  @IsOptional()
  status?: number;

  @IsOptional()
  @IsDateString()
  deletedAt?: string;

  @IsOptional()
  @IsDateString()
  updatedAt?: string;

}
