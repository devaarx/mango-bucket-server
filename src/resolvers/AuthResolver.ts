import { compare, hash } from 'bcryptjs';
import { validate } from 'class-validator';
import { sign } from 'jsonwebtoken';
import { Args, ArgsType, Ctx, Field, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../entity/User';
import { Context } from '../interfaces/context';

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

// login arg types
@ArgsType()
class LoginArgs {
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
      let user = new User(); // create new user entity instance
      const hashedPassword = await hash(password, 12); // hash password

      user.name = name;
      user.email = email;
      user.password = hashedPassword;

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

  @Mutation(() => User)
  async login(@Args() { email, password }: LoginArgs, @Ctx() { res }: Context) {
    const user = await User.findOne({ email }); // check for user

    if (!user) {
      throw Error('no user found');
    }

    const validPassword = await compare(password, user.password); // check the password

    if (!validPassword) {
      throw Error('invalid password');
    }

    const signedId = await sign({ user_id: user.id }, process.env.JWT_SECRET_TOKEN, { expiresIn: '1d' }); // jwt signed userid
    res.cookie('jwt', signedId, { httpOnly: true, maxAge: 3600000 * 24 }); // set cookie

    return user;
  }
}
