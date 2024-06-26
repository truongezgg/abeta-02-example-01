import User from './User';
import Notification from './Notification.entity';
import { Post } from './Post.entity';
import UserNotification from './UserNotification.entity';
import { LikedPost } from './LikedPost.entity';
import LikeComment from './likeComment.entity';
import Comment from './Comment.entity';
import { PostImage } from './postImage.entity';
import UserImage from './UserImage.entity';
import CommentImage from './CommentImage.entity';

import { RequestMakeFriend } from './ReuestMakeFriend.entity';

import EmailOtp from './EmailOtp.entity';


export const DefaultEntities = [
  User,
  Notification,
  Post,
  UserNotification,
  Comment,
  LikeComment,
  LikedPost,
  PostImage,
  UserImage,
  CommentImage,

  RequestMakeFriend,

  EmailOtp,

];
export default DefaultEntities;
