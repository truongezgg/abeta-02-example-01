import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '@app/database-type-orm/entities/Post.entity';
import { Repository } from 'typeorm';
import { Body } from '@nestjs/common';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}
  create(@Body() createPostDto: CreatePostDto, id: number) {
    const post = this.postRepository.create({
      ...createPostDto,
      userId: id,
    });

    const result = this.postRepository.save(post);
    // if (result) return 'This action adds a new post';
    return { result: result, id: id };
  }

  findAll() {
    const result = this.postRepository.find();

    return result;
  }

  findOne(id: number) {
    const result = this.postRepository.findOne({ where: { id } });

    return result;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    const result = this.postRepository.update({ id }, updatePostDto);
    return result;
  }

  remove(id: number) {
    const result = this.postRepository.delete({ id });
    return result;
  }
}
