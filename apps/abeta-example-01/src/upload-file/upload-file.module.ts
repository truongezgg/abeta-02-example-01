import { Module } from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { UploadFileController } from './upload-file.controller';
// import { MulterModule } from '@nestjs/platform-express';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { diskStorage } from 'multer';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [
    // MulterModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     storage: diskStorage({
    //       destination: configService.get<string>('MULTER_DEST'), // specify upload directory
    //       filename: (req, file, callback) => {
    //         const fileName = `${Date.now()}-${file.originalname}`;
    //         callback(null, fileName);
    //       },
    //     }),
    //   }),
    //   inject: [ConfigService],
    // }),
    ImageModule,
  ],
  controllers: [UploadFileController],
  providers: [UploadFileService],
})
export class UploadFileModule {}
