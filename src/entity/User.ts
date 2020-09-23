import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { IsDate, IsEmail } from 'class-validator';

@ObjectType()
@Entity()
export class User {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
