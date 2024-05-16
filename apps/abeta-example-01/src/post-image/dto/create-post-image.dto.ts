import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostImageDto {
  @IsNotEmpty()
  postId: number;

  @IsOptional()
  files?: Array<any>;
}
