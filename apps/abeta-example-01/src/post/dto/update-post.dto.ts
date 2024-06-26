import { PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  title?: string;
  content?: string;
  deletedAt?: Date;
  updatedAt?: Date;
}
