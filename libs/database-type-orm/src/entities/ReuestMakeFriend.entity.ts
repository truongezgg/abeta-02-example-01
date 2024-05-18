import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import User from './User';

@Entity('request_make_friend')
export class RequestMakeFriend {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint', unsigned: true })
  id: number;

  @Column({ name: 'sender_id', type: 'bigint', unsigned: true })
  senderId: number;

  @Column({ name: 'receiver_id', type: 'bigint', unsigned: true })
  receiverId: number;

  @Column({
    name: 'status',
    type: 'int',
    comment: '1: accepted, 0: havent ever accepted, 2: deleted req',
    default: 0,
  })
  status: number;

  @ManyToOne(() => User, (user) => user.requestSender)
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @ManyToOne(() => User, (user) => user.requestReceiver)
  @JoinColumn({ name: 'receiver_id' })
  receiver: User;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: string;
}
