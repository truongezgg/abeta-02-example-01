import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '@app/database-type-orm/entities/User';
import { SubscribeController } from './subscribe.controller';
import { SubscribeService } from './subscribe.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [SubscribeController],
  providers: [SubscribeService],
})
export class SubscribeModule {}
