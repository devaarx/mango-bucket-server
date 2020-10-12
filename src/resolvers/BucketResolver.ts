import { EROFS } from 'constants';
import { Arg, Args, ArgsType, Ctx, Field, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
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

@ArgsType()
class BucketUpdateArgs {
  @Field()
  bucket_id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  color: string;

  @Field({ nullable: true })
  deadline: Date;

  @Field({ nullable: true })
  pinned: boolean;
}

@Resolver()
export class BucketResolver {
  // bucket info query
  @Query(() => Bucket)
  @UseMiddleware(isAuth)
  async bucketInfo(@Arg('bucket_id') bucket_id: string) {
    const bucket = await Bucket.findOne({ id: bucket_id }, { relations: ['tasks'] }); // find bucket with tasks relation

    if (!bucket) {
      throw new Error('no bucket found');
    }

    return bucket;
  }

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

  // delete bucket mutation
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteBucket(@Arg('bucket_id') bucket_id: string) {
    const bucket = await Bucket.findOne({ id: bucket_id }); // find the bucket

    if (!bucket) {
      throw new Error('bucket not found');
    }

    try {
      await Bucket.delete({ id: bucket_id }); // delete the bucket
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }

  // update bucket mutation
  @Mutation(() => Bucket)
  @UseMiddleware(isAuth)
  async updateBucket(@Args() { bucket_id, ...args }: BucketUpdateArgs) {
    await Bucket.update({ id: bucket_id }, { ...args }); // update the bucket
    const bucket = await Bucket.findOne({ id: bucket_id }); // find th updated bucket
    // return the bucket
    return bucket;
  }
}
