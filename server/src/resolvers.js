import { hash, compare } from 'bcryptjs';
import { User } from './models';

export const resolvers = {
  Query: {
    userInfo: (_, { id }) => User.findOne({ _id: id }) // get the user info
  },

  Mutation: {
    register: async (_, { first_name, last_name, email, password }) => {
      const duplicate = await User.findOne({ email }); // check if user already exists

      if (duplicate) {
        throw Error('User already exists!');
      } else {
        const hashedPassword = await hash(password, 12); // hash password
        const user = new User({ first_name, last_name, email, password: hashedPassword }); // create the user
        // save the user
        await user.save().catch((error) => {
          console.log(error);
          throw Error('Error while creating user. Try again!');
        });
        return user; // return the user
      }
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email }); // check user creds

      if (!user) {
        // user not found
        throw Error('User not found!');
      }

      const validPassword = await compare(password, user.password); // check the password

      if (!validPassword) {
        throw Error('Invalid password!');
      }

      return user; // return the user
    }
  }
};
