import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './User';
import { IsCurrent } from '../../../core/src/constants/enum';

@Entity('user-image')
export default class UserImage {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint', unsigned: true })
  id: number;

  @Column({ name: 'user_id', type: 'bigint', unsigned: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.images)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'url', type: 'varchar' })
  url: string;

  @Column({
    name: 'image_type',
    type: 'tinyint',
    unsigned: true,
    comment: '0: profile picture, 1: cover picture',
  })
  image_type: number;

  @Column({
    name: 'is_current_avatar',
    type: 'tinyint',
    default: IsCurrent.IS_CURRENT,
  })
  isCurrentAvatar: number;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: string;
}
