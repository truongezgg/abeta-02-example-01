import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User';
import Notification from './Notification';

@Entity('user_notification')
export default class UserNotification {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint', unsigned: true })
  id: number;

  @Column({ name: 'receiver_id', type: 'bigint', unsigned: true })
  receiverId: number;

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
}
