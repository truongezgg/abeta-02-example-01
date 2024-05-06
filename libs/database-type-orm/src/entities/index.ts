import User from './User';
import Notification from './Notification';
import { Post } from './Post.entity';
import UserNotification from "./UserNotification.entity";
import LikeComment from './likeComment.entity';
import Comment from './comment.entity';

export const DefaultEntities = [User, Notification, Post, UserNotification, Comment, LikeComment];

export default DefaultEntities
