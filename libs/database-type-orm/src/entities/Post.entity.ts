import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import User from './User';

import { LikedPost } from './LikedPost.entity';

import Comment from './Comment.entity';
import { PostImage } from './postImage.entity';
import { CommonStatus } from '../../../core/src/constants/enum';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint', unsigned: true })
  id: number;

  @Column({ name: 'title', type: 'varchar', length: 255 })
  title: string;

  @Column({ name: 'content', type: 'varchar', length: 500 })
  content: string;

  @Column({ name: 'user_id', type: 'bigint', unsigned: true })
  userId: number;

  @Column({
    name: 'status',
    type: 'int',
    unsigned: true,
    default: 1,
    comment: '1: active, 0: not active',
  })
  status: number;

  @ManyToOne(() => User, (user) => user.post)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => PostImage, (image) => image.post)
  image: PostImage[];

  @OneToMany(() => LikedPost, (likepost) => likepost.post)
  likedPost: Post[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comment: Comment[];

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: string;
}
