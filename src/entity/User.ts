import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { IsDate, IsEmail } from 'class-validator';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field()
  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Field()
  @CreateDateColumn()
  @IsDate()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  @IsDate()
  updated_at: Date;
}
