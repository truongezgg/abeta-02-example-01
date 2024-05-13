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
import { Post } from './Post.entity';

@Entity('post_image')
export class PostImage {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint', unsigned: true })
  id: number;

  @Column({ name: 'post_id', type: 'bigint', unsigned: true })
  postId: number;

  @Column({ name: 'url', type: 'varchar', length: 255 })
  url: string;

  @Column({
    name: 'status',
    type: 'int',
    unsigned: true,
    default: 1,
    comment: '1: active, 0: not active',
  })
  status: number;

  @ManyToOne(() => Post, (post) => post.image)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: string;
}
