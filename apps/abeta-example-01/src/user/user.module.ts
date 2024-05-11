import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '@app/database-type-orm/entities/User';

import { JwtAuthenticationModule } from '@app/jwt-authentication';
import { FirebaseService } from './firebase.service';
@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtAuthenticationModule],

  exports: [UserService, FirebaseService],
  providers: [UserService, FirebaseService],

  controllers: [UserController],
})
export class UserModule {}
