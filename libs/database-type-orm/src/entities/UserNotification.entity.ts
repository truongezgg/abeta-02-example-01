import {
  Column, CreateDateColumn, DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import User from './User';
import Notification from './Notification.entity';

@Entity('user_notification')
export default class UserNotification {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint', unsigned: true })
  id: number;

  @Column({ name: 'receiver_id', type: 'bigint', unsigned: true })
  receiverId: number;

  @Column({ name: 'read', type: 'bool', default: false })
  read: boolean;

  @Column({ name: 'notification_id', type: 'bigint', unsigned: true })
  notificationId: number;

  @ManyToOne(() => User, (user) => user.receiverNotifications)
  @JoinColumn({ name: 'receiver_id' })
  userReceived: User;

  @ManyToOne(
    () => Notification,
    (notification) => notification.userNotifications,
  )
  @JoinColumn({ name: 'notification_id' })
  notification: Notification;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: string;
}
