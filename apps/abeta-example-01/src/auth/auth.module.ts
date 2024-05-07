import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '@app/database-type-orm/entities/User';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserModule],
  exports: [AuthService],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
