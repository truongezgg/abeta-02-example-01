import { Module } from '@nestjs/common';
import { OnesignalNotificationService } from './onesignal-notification.service';

@Module({
  providers: [OnesignalNotificationService],
  exports: [OnesignalNotificationService],
})
export class OnesignalNotificationModule {}
