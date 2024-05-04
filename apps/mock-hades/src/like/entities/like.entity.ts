import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '@app/database-type-orm/entities/User.entity';
import Post from '../../post/entities/post.entity';
@Entity('like')
export default class Like {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.like)
  @JoinColumn({ name: 'user_id' })
  user: number;

  @ManyToOne(() => Post, (post) => post.like)
  @JoinColumn({ name: 'post_id' })
  post: number;
}
