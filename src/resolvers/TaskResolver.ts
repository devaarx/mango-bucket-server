import { Args, ArgsType, Field, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Bucket } from '../entity/Bucket';
import { Task } from '../entity/Task';
import { isAuth } from '../middlewares/isAuth';

// task arg types
@ArgsType()
class TaskArgs {
  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  status: string;

  @Field()
  schedule_time: Date;

  @Field()
  bucket_id: string;
}

@Resolver()
export class TaskResolver {
  @Query(() => String)
  async helloTask() {
    return 'task hello';
  }

  // create task mutation
  @Mutation(() => Task)
  @UseMiddleware(isAuth)
  async createTask(@Args() { name, description, status, schedule_time, bucket_id }: TaskArgs) {
    const bucket = await Bucket.findOne({ id: bucket_id });

    const task = new Task();

    task.name = name;
    task.description = description;
    task.status = status;
    task.schedule_time = schedule_time;
    task.bucket = bucket;

    try {
      await task.save();
    } catch (error) {
      console.log(error);
    }

    return task;
  }
}
