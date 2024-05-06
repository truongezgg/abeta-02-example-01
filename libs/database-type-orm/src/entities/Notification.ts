import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './User';
import UserNotification from './UserNotification.entity';

@Entity('notification')
export default class Notification {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint', unsigned: true })
  id: number;

  @Column({ name: 'title', type: 'varchar', length: 255 })
  title: string;

  @Column({ name: 'content', type: 'varchar', length: 500 })
  content: string;

  @Column({ name: 'sender_id', type: 'bigint', unsigned: true })
  senderId: number;

  @Column({ name: 'notification_id', type: 'bigint', unsigned: true })
  notificationId: number;

  @ManyToOne(() => User, (user) => user.notifications)
  @JoinColumn({ name: 'sender_id' })
  userSend: User;

  @OneToMany(
    () => UserNotification,
    (userNotifications) => userNotifications.notification,
  )
  userNotifications: UserNotification[];

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: string;
}
