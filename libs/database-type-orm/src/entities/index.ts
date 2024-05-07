import User from './User';
import Notification from './Notification.entity';
import { Post } from './Post.entity';
import UserNotification from './UserNotification.entity';
import { LikedPost } from './LikedPost.entity';
import LikeComment from './likeComment.entity';
import Comment from './Comment.entity';
export const DefaultEntities = [
  User,
  Notification,
  Post,
  UserNotification,
  LikeComment,
  Comment,
  LikedPost,
];
export default DefaultEntities;
