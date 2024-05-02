import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'email_otp' })
export class EmailOtp {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: 'ID auto increment',
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'otp',
    length: 255,
  })
  otp: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'email',
  })
  email: string;

  @CreateDateColumn({
    type: 'datetime',
    name: 'created_at',
  })
  createdAt: Date;
}
