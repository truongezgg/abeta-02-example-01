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
import { ImageService } from '../image/image.service';
import { PostImageService } from './post-image.service';
// import { CreatePostImageDto } from './dto/create-post-image.dto';
import { UpdatePostImageDto } from './dto/update-post-image.dto';
import { Public } from '@app/jwt-authentication/jwt-authentication.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
class formData extends FormData {
  postId: string;
}
@Controller('post-image')
export class PostImageController {
  constructor(
    private readonly postImageService: PostImageService,
    private readonly imageService: ImageService,
  ) {}

  @Public()
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFileAndPassValidation(
    @Body() body: formData,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image/jpeg',
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    files: Array<Express.Multer.File>,
  ) {
    try {
      const postId = body.postId;

      if (files.length > 0 && Array.isArray(files) && postId) {
        const result = await this.postImageService.create({
          postId: parseInt(postId),
          files: files,
        });

        return result;
      }
      return null;
      // console.log(parseInt(body.postId));
      // console.log(files);
      // for (let i = 0; i < files.length; i++) console.log(files[i]);
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  findAll() {
    return this.postImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postImageService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostImageDto: UpdatePostImageDto,
  ) {
    return this.postImageService.update(+id, updatePostImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postImageService.remove(+id);
  }
}
