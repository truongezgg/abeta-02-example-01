import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsDateString,
  MaxLength,
} from 'class-validator';
export class CreatePostDto {
  @ApiProperty({ example: 'Title' })
  @IsNotEmpty({ message: 'Title must not be empty.' })
  @MaxLength(255, { message: 'Title must not exceed 255 characters.' })
  title: string;

  @ApiProperty({ example: 'Content' })
  @IsNotEmpty({ message: 'Content must not be empty.' })
  @MaxLength(500, { message: 'Title must not exceed 500 characters.' })
  content: string;

  @IsOptional()
  @IsDateString()
  deletedAt?: Date;

  @IsOptional()
  @IsDateString()
  updatedAt?: Date;
}
