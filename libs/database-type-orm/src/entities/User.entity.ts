// Import necessary modules from TypeORM
import { UserImage } from '@app/s3-upload/entities/UserImage.entity';
import Comment from 'apps/mock-hades/src/comment/entities/comment.entity';
import Like from 'apps/mock-hades/src/like/entities/like.entity';
import LikeComment from 'apps/mock-hades/src/like/entities/likeComment.entity';
import Post from 'apps/mock-hades/src/post/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
// import { NotificationToken } from '../../../notifitcation-firebase/src/entities/NotificationToken.entity';
import { Notification } from 'libs/onesignal-notification/entities/notification.entity';
@Entity({ name: 'user' })
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: 'ID auto increment',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'email',
    comment: "User's email address.",
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'password',
    comment: "User's hashed password.",
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'name',
    comment: "User's name",
    nullable: true,
  })
  name: string;

  @Column({
    type: 'tinyint',
    name: 'status',
    comment: '1: active, 0: inactive',
    nullable: false,
    default: 1,
  })
  status: number;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'phone_number',
    comment: "User's phone number",
    nullable: true,
  })
  phoneNumber?: string;

  @Column({
    type: 'varchar',
    length: 500,
    name: 'refresh_token',
    comment: 'JWT refresh token, make sure only one refresh token is active.',
    nullable: true,
  })
  refreshToken: string;

  @Column({
    type: 'varchar',
    length: 500,
    name: 'reset_token',
    comment:
      'JWT reset password token, make sure only one reset token is active.',
    nullable: true,
  })
  resetToken: string;

  @CreateDateColumn({
    type: 'datetime',
    name: 'created_at',
    comment: 'Timestamp of creation',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    name: 'updated_at',
    comment: 'Timestamp of last update',
    nullable: false,
  })
  updatedAt: Date;

  // @OneToMany(() => NotificationToken, (token) => token.user)
  // notificationToken: NotificationToken[];

  @OneToMany(() => UserImage, (userImage) => userImage.user)
  image: UserImage[];
  @OneToMany(() => Like, (like) => like.user)
  like: Like[];
  @OneToMany(() => LikeComment, (likeCmt) => likeCmt.user)
  likeCmt: LikeComment[];
  @OneToMany(() => Comment, (cmt) => cmt.user)
  comment: Comment[];
  @OneToMany(() => Post, (post) => post.user)
  post: Post[];

  @OneToMany(
    () => Notification,
    (a) => {
      a.receiverId && a.senderId;
    },
  )
  notification: Notification[];
}
