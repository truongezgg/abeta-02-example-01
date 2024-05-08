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

@Entity('comment_image')
export default class CommentImage {
  @PrimaryGeneratedColumn('increment', {
    type: 'int',
    name: 'id',
    unsigned: true,
  })
  id: number;

  @Column('varchar', { name: 'url' })
  content: string;

  @Column({ name: 'comment_id', type: 'int', unsigned: true })
  commentId: number;

  @OneToOne(() => Comment, (cmt) => cmt.id)
  @JoinColumn({ name: 'comment_id' })
  comment: Comment;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: string;
}
