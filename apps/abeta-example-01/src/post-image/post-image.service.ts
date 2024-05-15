import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostImageDto } from './dto/create-post-image.dto';
// import { UpdatePostImageDto } from './dto/update-post-image.dto';
import { ImageService } from '../image/image.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PostImage } from '@app/database-type-orm/entities/postImage.entity';
import { Repository } from 'typeorm';
@Injectable()
export class PostImageService {
  constructor(
    @InjectRepository(PostImage)
    private readonly postImageRepository: Repository<PostImage>,

    private readonly imageService: ImageService,
  ) {}
  async create(createPostImageDto: CreatePostImageDto) {
    try {
      const getAllUrl = await this.imageService.uploadImage(
        createPostImageDto.files,
      );
      const arrayImage = [];
      if (Array.isArray(getAllUrl) && getAllUrl.length > 0) {
        for (let i = 0; i < getAllUrl.length; i++) {
          const creater = await this.postImageRepository.create({
            postId: createPostImageDto.postId,
            url: getAllUrl[i],
          });

          const result = await this.postImageRepository.save(creater);
          arrayImage.push(result);
        }
        return arrayImage;
      }

      return null;
    } catch {
      throw new HttpException(
        'Internal Server',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return `This action returns all postImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postImage`;
  }

  // update(id: number, updatePostImageDto: UpdatePostImageDto) {
  //   return `This action updates a #${id} postImage`;
  // }

  remove(id: number) {
    return `This action removes a #${id} postImage`;
  }
}
