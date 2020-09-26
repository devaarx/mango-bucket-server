import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import { User } from '../entity/User';
import { Context } from '../interfaces/context';
import { isAuth } from '../middlewares/isAuth';

@Resolver()
export class UserResolver {
  // userinfo query
  @Query(() => User)
  @UseMiddleware(isAuth) // auth middleware: type-graphql
  async userInfo(@Ctx() context: Context) {
    const userId = context.user.id;
    const user = await User.findOne({ id: userId }); // find the user

    return user;
  }
}
