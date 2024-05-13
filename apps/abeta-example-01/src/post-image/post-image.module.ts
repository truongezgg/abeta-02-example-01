import { Module } from '@nestjs/common';
import { PostImageService } from './post-image.service';
import { PostImageController } from './post-image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostImage } from '@app/database-type-orm/entities/postImage.entity';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostImage]), ImageModule],
  controllers: [PostImageController],
  providers: [PostImageService],
})
export class PostImageModule {}
