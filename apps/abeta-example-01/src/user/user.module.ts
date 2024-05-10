import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '@app/database-type-orm/entities/User';
import { FirebaseService } from './firebase.service';
import { JwtAuthenticationModule } from '@app/jwt-authentication';
<<<<<<< HEAD

import { FirebaseService } from './firebase.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
=======
@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtAuthenticationModule],
>>>>>>> 4646d261dcc2b299e6b1cacfc4a33f467f9ae238
  exports: [UserService, FirebaseService],
  providers: [UserService, FirebaseService],

  controllers: [UserController],
})
export class UserModule {}
