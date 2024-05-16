import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseFilePipeBuilder,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
// import { CreateUploadFileDto } from './dto/create-upload-file.dto';
import { UpdateUploadFileDto } from './dto/update-upload-file.dto';
// import { FileValidator } from './upload-file.fileValidator';
// import { FileSizeValidationPipe } from './uploadfile.SizeValidationPipe';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Public } from '@app/jwt-authentication/jwt-authentication.decorator';
import { ImageService } from '../image/image.service';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('upload-file')
export class UploadFileController {
  constructor(
    private readonly uploadFileService: UploadFileService,
    private readonly imageService: ImageService,
  ) {}

  @Public()
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFileAndPassValidation(
    @Body() body: FormData,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image',
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    files: Array<Express.Multer.File>,
  ) {
    try {
      const image = await this.imageService.uploadImage(files);
      return image;
      // for (let i = 0; i < files.length; i++) console.log(files[i]);
    } catch (error) {
      console.log(error);
    }
  }
  // @Public()
  // @Post('upload')
  // @UseInterceptors(FilesInterceptor('files'))
  // uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
  //   console.log(files);
  // }
  @Get()
  findAll() {
    return this.uploadFileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadFileService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUploadFileDto: UpdateUploadFileDto,
  ) {
    return this.uploadFileService.update(+id, updateUploadFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadFileService.remove(+id);
  }
}
