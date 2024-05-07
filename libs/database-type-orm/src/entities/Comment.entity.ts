import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import LikeComment from './likeComment.entity';
import User from './User';
import { Post } from './Post.entity';
import CommentImage from './CommentImage.entity';
@Entity('comment')
export default class Comment {
  @PrimaryGeneratedColumn('increment', {
    type: 'int',
    name: 'id',
    unsigned: true,
  })
  id: number;

  @Column('varchar', { name: 'content' })
  content: string;

  @Column({ name: 'post_id', type: 'int', unsigned: true })
  postId: number;

  @Column({ name: 'user_id', type: 'int', unsigned: true })
  userId: number;

  @Column({ name: 'comment_image_id', type: 'int', unsigned: true })
  commentImageId: number;

  @ManyToOne(() => User, (user) => user.comment)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Post, (post) => post.comment)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @OneToMany(() => LikeComment, (likeCmt) => likeCmt.comment)
  likeCmt: LikeComment[];

  @OneToOne(() => CommentImage, (cmtImage) => cmtImage.comment)
  @JoinColumn({ name: 'comment_image_id' })
  commentImage: CommentImage;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: string;
}
