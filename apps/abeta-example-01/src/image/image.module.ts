import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { FirebaseStorageModule } from '@app/firebase-storage';

@Module({
  imports: [FirebaseStorageModule],
  controllers: [ImageController],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
