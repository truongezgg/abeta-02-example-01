import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '@app/database-type-orm/entities/User';
import { Repository } from 'typeorm';
import { Exception } from '@app/core/exception';
import { ErrorCode } from '@app/core/constants/enum';
import { FirebaseService } from './firebase.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private firebaseService: FirebaseService,
  ) {}

  public async create(user: any) {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  public async update(id: number, updateData: Partial<User>) {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new Exception(ErrorCode.User_Not_Found, 'User Not Found');
    }
    Object.assign(user, updateData);
    return this.userRepository.save(user);
  }

  public async findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email: email });
  }

  public async findOneById(id: number) {
    return this.userRepository.findOneBy({ id: id });
  }

  updateRefreshToken(id: number, refreshToken) {
    return this.userRepository.update(
      { id: id },
      { refreshToken: refreshToken },
    );
  }

  async uploadImage(file) {
    const storage = this.firebaseService.getStorageInstance();
    const bucket = storage.bucket();
    const fileName = `${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);
    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimeType,
      },
    });
    return new Promise((resolve, reject) => {
      stream.on('error', (err) => {
        reject(err);
      });
      stream.on('finish', () => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileName}`;
        resolve(imageUrl);
      });
      stream.end(file.buffer);
    });
  }
}
