import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Notification } from './notification.entity';

@Entity('notification_category')
export class NotificationCategory {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column({ name: 'type_name', type: 'varchar', length: 255 })
  typeName: string;

  @OneToMany(
    () => Notification,
    (notification) => notification.notficationCategory,
  )
  notification: Notification[];
}
