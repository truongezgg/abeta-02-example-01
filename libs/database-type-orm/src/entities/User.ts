import { Post } from './Post.entity';
import { CommonStatus } from '../../../core/src/constants/enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Notification from './Notification.entity';
import UserNotification from './UserNotification.entity';

import { LikedPost } from './LikedPost.entity';

import LikeComment from './likeComment.entity';
import Comment from './Comment.entity';
import UserImage from './UserImage.entity';

import { RequestMakeFriend } from './ReuestMakeFriend.entity';

import EmailOtp from './EmailOtp.entity';


@Entity('user')
export default class User {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint', unsigned: true })
  id: number;

  @Column({ name: 'email', type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 100,
    select: false,
    nullable: true,
  })
  password: string;

  @Column({ name: 'name', type: 'varchar', length: 100, nullable: true })
  name: string;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  phoneNumber: string;

  @Column({
    name: 'status',
    type: 'tinyint',
    default: CommonStatus.ACTIVE,
    unsigned: true,
  })
  status: number;

  @Column({ name: 'reset_token', type: 'varchar', length: 100, nullable: true })
  resetToken: string;

  @Column({
    name: 'refresh_token',
    type: 'varchar',
    length: 500,
    select: false,
    nullable: true,
  })
  refreshToken: string;

  @Column({ name: 'date_of_birth', type: 'varchar', default: null })
  dateOfBirth: string;

  @Column({ name: 'address', type: 'varchar', default: null })
  address: string;

  @OneToMany(() => Notification, (notifications) => notifications.userSend)
  notifications: Notification[];

  @OneToMany(
    () => UserNotification,
    (receiverNotifications) => receiverNotifications.userReceived,
  )
  receiverNotifications: UserNotification[];

  @OneToMany(() => UserImage, (images) => images.user)
  images: UserImage[];

  @OneToMany(() => Post, (post) => post.user)
  post: Post[];

  @OneToMany(() => LikedPost, (likepost) => likepost.user)
  userLike: LikedPost[];

  @OneToMany(() => LikeComment, (likeCmt) => likeCmt.user)
  likeCmt: LikeComment[];

  @OneToMany(() => Comment, (cmt) => cmt.user)
  comment: Comment[];


  @OneToMany(() => RequestMakeFriend, (req) => req.sender)
  requestSender: RequestMakeFriend[];

  @OneToMany(() => RequestMakeFriend, (req) => req.receiver)
  requestReceiver: RequestMakeFriend[];

  @OneToMany(() => EmailOtp, (otps) => otps.user)
  otps: EmailOtp[];


  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: string;
}
