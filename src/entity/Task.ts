import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Bucket } from './Bucket';

@ObjectType()
@Entity()
export class Task extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field()
  @Column({ default: 'PENDING' })
  status: string;

  @Field()
  @Column()
  schedule_time: Date;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Bucket, (bucket) => bucket.tasks, { onDelete: 'CASCADE' }) // cascade delete of tasks
  bucket: Bucket;
}
