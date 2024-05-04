import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { User } from '@app/database-type-orm/entities/User.entity';
import Comment from '../../comment/entities/comment.entity';
@Entity('like_comment')
export default class LikeComment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // @Column('int', { name: 'user_id' })
  // userId: number;

  // @Column('int', { name: 'comment_id' })
  // commentId: number;

  @ManyToOne(() => User, (user) => user.likeCmt)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Comment, (cmt) => cmt.likeCmt)
  @JoinColumn({ name: 'comment_id' })
  comment: Comment;
}
