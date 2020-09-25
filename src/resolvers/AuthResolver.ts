import { validate } from 'class-validator';
import { Args, ArgsType, Field, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../entity/User';

// register arg types
@ArgsType()
class RegisterArgs {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@Resolver()
export class AuthResolver {
  // hello query
  @Query(() => String)
  hello() {
    return 'hello world!';
  }

  // register mutation
  @Mutation(() => User)
  async register(@Args() { name, email, password }: RegisterArgs) {
    const duplicate = await User.findOne({ email }); // check if user already exists

    if (duplicate) {
      throw Error('user exists');
    } else {
      // create new user entity instance
      let user = new User();
      user.name = name;
      user.email = email;
      user.password = password;

      const errors = await validate(user); // validate the user

      if (errors.length > 0) {
        console.log(errors);
        throw new Error('validation error');
      } else {
        await user.save();
      }

      return user;
    }
  }
}
