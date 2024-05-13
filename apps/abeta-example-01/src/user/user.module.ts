import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '@app/database-type-orm/entities/User';
import { FirebaseService } from './firebase.service';
import { JwtAuthenticationModule } from '@app/jwt-authentication';
import UserImage from '@app/database-type-orm/entities/UserImage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserImage]),
    JwtAuthenticationModule,
  ],

  exports: [UserService, FirebaseService],
  providers: [UserService, FirebaseService],

  controllers: [UserController],
})
export class UserModule {}
