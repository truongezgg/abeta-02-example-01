import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import User from './User';
import Comment from './Comment.entity';
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
}
