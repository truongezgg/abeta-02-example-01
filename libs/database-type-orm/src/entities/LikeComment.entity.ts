import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './User';
import Comment from './Comment.entity';
import { CommonStatus } from '../../../core/src/constants/enum';
@Entity('like_comment')
export default class LikeComment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'user_id', type: 'int', unsigned: true })
  userId: number;

  @Column({ name: 'comment_id', type: 'int', unsigned: true })
  commentId: number;

  @ManyToOne(() => User, (user) => user.likeCmt)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Comment, (cmt) => cmt.likeCmt)
  @JoinColumn({ name: 'comment_id' })
  comment: Comment;

  @Column({
    name: 'status',
    type: 'tinyint',
    default: CommonStatus.ACTIVE,
    unsigned: true,
  })
  status: number;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: string;
}
