import { Args, ArgsType, Ctx, Field, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Bucket } from '../entity/Bucket';
import { User } from '../entity/User';
import { Context } from '../interfaces/context';
import { isAuth } from '../middlewares/isAuth';

// bucket arg types
@ArgsType()
class BucketArgs {
  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  color: string;

  @Field()
  deadline: Date;
}

@Resolver()
export class BucketResolver {
  // all buckets
  @Query(() => [Bucket])
  @UseMiddleware(isAuth)
  async allBuckets(@Ctx() { user: { id } }: Context) {
    const user = await User.findOne({
      where: {
        id: id
      },
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          buckets: 'user.buckets',
          tasks: 'buckets.tasks'
        }
      }
    }); // querying user with 'buckets' relation attached

    const buckets = user.buckets;

    return buckets;
  }

  // create bucket mutation
  @Mutation(() => Bucket)
  @UseMiddleware(isAuth)
  async createBucket(@Ctx() { user: { id } }: Context, @Args() { name, description, color, deadline }: BucketArgs) {
    const bucket = new Bucket();
    const user = await User.findOne({ id });

    bucket.user = user;
    bucket.name = name;
    bucket.description = description;
    bucket.color = color;
    bucket.deadline = deadline;

    try {
      await bucket.save();
    } catch (error) {
      console.log(error);
    }

    return bucket;
  }
}
