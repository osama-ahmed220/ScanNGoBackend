import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {User} from './User';

@Entity()
export class Scan extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: number;

  @Column()
  message: string;

  @Column()
  time: string;

  @Column()
  dish: string;

  @Column()
  phoneNumber: string;

  @Column({default: false})
  deleted: boolean;

  @DeleteDateColumn()
  @Index()
  deletedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.scans)
  user: User;
}
