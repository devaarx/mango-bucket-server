import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { User } from './User';
import { Task } from './Task';

@ObjectType()
@Entity()
export class Bucket extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ nullable: true })
  description: string;

  @Field()
  @Column()
  color: string;

  @Field()
  @Column({ nullable: true })
  deadline: Date;

  @Field()
  @Column({ default: false })
  pinned: boolean;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;

  @Field(() => [Task], { nullable: true })
  @OneToMany(() => Task, (task) => task.bucket)
  tasks: Task[];

  @ManyToOne(() => User, (user) => user.buckets)
  user: User;
}
