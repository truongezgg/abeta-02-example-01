import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import Comment from '../../comment/entities/comment.entity';
import { User } from '@app/database-type-orm/entities/User.entity';
import Like from '../../like/entities/like.entity';
@Entity('post')
export default class Post {
  @PrimaryGeneratedColumn('increment', {
    type: 'int',
    name: 'id',
    unsigned: true,
  })
  id: number;

  @Column({ name: 'title', type: 'varchar', length: 255 })
  title: string;

  @Column({ name: 'content', type: 'varchar', length: 255 })
  content: string;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @ManyToOne(() => User, (user) => user.post)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({
    type: 'datetime',
    name: 'created_at',
    comment: 'Timestamp of creation',
    nullable: false,
  })
  createdAt: Date;

  @DeleteDateColumn({
    type: 'datetime',
    name: 'created_at',
    comment: 'Timestamp of creation',
    nullable: true,
  })
  deletedAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    name: 'updated_at',
    comment: 'Timestamp of last update',
    nullable: false,
  })
  updatedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.post)
  comment: Comment[];

  @OneToMany(() => Like, (like) => like.post)
  like: Like[];
}
