import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';
import { Bucket } from './Bucket';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  @Length(2, 30)
  name: string;

  @Field()
  @Column()
  @IsEmail()
  email: string;

  @Length(2)
  @Column()
  password: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Bucket, (bucket) => bucket.user)
  buckets: Bucket[];
}
