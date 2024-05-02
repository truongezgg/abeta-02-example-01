import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@app/database-type-orm/entities/User.entity';
@Entity({ name: 'user_image' })
export class UserImage {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: 'ID auto increment',
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'image_location',
    length: 500,
  })
  imageLocation: string;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;
  @ManyToOne(() => User, (user) => user.image)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({
    type: 'datetime',
    name: 'created_at',
  })
  createdAt: Date;

  @DeleteDateColumn({
    type: 'datetime',
    name: 'deleted_at',
  })
  deletedAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    name: 'updated_at',
  })
  updatedAt: Date;
}
