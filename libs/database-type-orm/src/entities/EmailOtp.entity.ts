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

@Entity('email_otp')
export default class EmailOtp {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint', unsigned: true })
  id: number;

  @Column({ name: 'otp', type: 'varchar', unique: true })
  otp: string;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ name: 'user_id', type: 'bigint', unsigned: true })
  user_id: number;

  @ManyToOne(() => User, (user) => user.otps)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    name: 'is_current',
    type: 'tinyint',
    unsigned: true,
    default: IsCurrent.IS_CURRENT,
  })
  isCurrent: number;

  @Column({
    name: 'category',
    type: 'tinyint',
    unsigned: true,
  })
  category: number;

  @DeleteDateColumn({ name: 'expired_at', type: 'datetime' })
  expiredAt: string;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: string;
}
