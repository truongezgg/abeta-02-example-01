import {
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from './User';
import { Post } from './Post.entity';
import { CommonStatus } from '../../../core/src/constants/enum';

@Entity('liked_post')
export class LikedPost {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint', unsigned: true })
  id: number;

  @Column({
    name: 'post_id',
    type: 'bigint',
    unsigned: true,
    comment: 'id of the liked post',
  })
  postId: number;

  @Column({
    name: 'user_id',
    type: 'bigint',
    comment: 'id of the user likes the post',
    unsigned: true,
  })
  userId: number;

  @ManyToOne(() => User, (user) => user.userLike)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Post, (post) => post.likedPost)
  @JoinColumn({ name: 'post_id' })
  post: Post;

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
