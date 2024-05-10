import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { OneSignal } from './onesignal';
import { TypeOrmModule } from '@nestjs/typeorm';
import Notification from '@app/database-type-orm/entities/Notification.entity';
import UserNotification from '@app/database-type-orm/entities/UserNotification.entity';
import { UserModule } from '../user/user.module';
import User from '@app/database-type-orm/entities/User';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, UserNotification, User]),
    UserModule,
  ],
  exports: [NotificationService, OneSignal],
  controllers: [NotificationController],
  providers: [NotificationService, OneSignal],
})
export class NotificationModule {}
