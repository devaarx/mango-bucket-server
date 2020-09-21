import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { IsDate, IsEmail } from 'class-validator';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column()
  @IsDate()
  created_at: Date;
}
