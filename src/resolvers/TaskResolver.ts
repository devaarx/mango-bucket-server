import { Arg, Args, ArgsType, Field, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
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

// task update arg types
@ArgsType()
class TaskUpdateArgs {
  @Field()
  task_id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  status: string;

  @Field({ nullable: true })
  schedule_time: Date;
}

@Resolver()
export class TaskResolver {
  // task info query
  @Query(() => Task)
  @UseMiddleware(isAuth)
  async taskInfo(@Arg('task_id') task_id: string) {
    const task = await Task.findOne({ id: task_id }); // find task

    if (!task) {
      throw new Error('no task found');
    }

    return task;
  }

  // create task mutation
  @Mutation(() => Task)
  @UseMiddleware(isAuth)
  async createTask(@Args() { name, description, status, schedule_time, bucket_id }: TaskArgs) {
    const bucket = await Bucket.findOne({ id: bucket_id });

    if (!bucket) {
      throw new Error('bucket not found');
    }

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

  // delete task mutation
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteTask(@Arg('task_id') task_id: string) {
    const task = await Task.findOne({ id: task_id }); // find task

    if (!task) {
      throw new Error('task not found');
    }

    try {
      await Task.delete({ id: task_id }); // delete task
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }

  // update task mutation
  @Mutation(() => Task)
  @UseMiddleware(isAuth)
  async updateTask(@Args() { task_id, ...args }: TaskUpdateArgs) {
    await Task.update({ id: task_id }, { ...args }); // update the task
    const task = await Task.findOne({ id: task_id }); // find th updated task
    // return the task
    return task;
  }
}
