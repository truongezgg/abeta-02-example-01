import { User } from './User.entity';
import Like from 'apps/mock-hades/src/like/entities/like.entity';
import Comment from 'apps/mock-hades/src/comment/entities/comment.entity';
import LikeComment from 'apps/mock-hades/src/like/entities/likeComment.entity';
import Post from 'apps/mock-hades/src/post/entities/post.entity';
import { UserImage } from '@app/s3-upload/entities/UserImage.entity';
import { EmailOtp } from '@app/send-mail/entities/EmailOtp.entity';
import { Notification } from 'libs/onesignal-notification/entities/notification.entity';
import { NotificationCategory } from 'libs/onesignal-notification/entities/notificationCategory.entity';
export const DefaultEntities = [
  User,
  Like,
  Post,
  Comment,
  LikeComment,
  UserImage,
  EmailOtp,
  Notification,
  NotificationCategory,
];
