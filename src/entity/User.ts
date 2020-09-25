import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  @Length(2, 30)
  name: string;

  @Field()
  @Column()
  @IsEmail({}, { message: 'bad email address' })
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
}
