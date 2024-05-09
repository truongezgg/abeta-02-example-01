import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '@app/database-type-orm/entities/User';
import { FirebaseService } from './firebase.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService, FirebaseService],
  providers: [UserService, FirebaseService],
  controllers: [UserController],
})
export class UserModule {}
