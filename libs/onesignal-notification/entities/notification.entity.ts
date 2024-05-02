import { User } from '@app/database-type-orm/entities/User.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NotificationCategory } from './notificationCategory.entity';
@Entity('notification')
export class Notification {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ name: 'title', type: 'varchar', length: 255 })
  title: string;

  @Column({ name: 'content', type: 'varchar', length: 500 })
  content: string;

  @Column({ name: 'read', type: 'boolean' })
  read: boolean;

  @Column({ name: 'sender_id', type: 'int' })
  senderId: number;

  @Column({ name: 'receiver_id', type: 'int' })
  receiverId: number;

  @Column({ name: 'category_id', type: 'int' })
  categoryId: number;

  @ManyToOne(() => User, (user) => user.notification)
  @JoinColumn({ name: 'sender_id' })
  userSend: User;

  @ManyToOne(() => User, (user) => user.notification)
  @JoinColumn({ name: 'receiver_id' })
  userReceiver: User;

  @ManyToOne(() => NotificationCategory, (cate) => cate.notification)
  @JoinColumn({ name: 'category_id' })
  notficationCategory: NotificationCategory;
}
