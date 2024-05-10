import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import Comment from './Comment.entity';
import { CommonStatus } from '../../../core/src/constants/enum';

@Entity('comment_image')
export default class CommentImage {
  @PrimaryGeneratedColumn('increment', {
    type: 'int',
    name: 'id',
    unsigned: true,
  })
  id: number;

  @Column('varchar', { name: 'url' })
  url: string;

  @Column({ name: 'comment_id', type: 'int', unsigned: true })
  commentId: number;

  @OneToOne(() => Comment, (cmt) => cmt.id)
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
