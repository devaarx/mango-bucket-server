import { hash, compare } from 'bcryptjs';
import { User } from './models';
import isEmail from 'validator/lib/isEmail';
import { sign, verify } from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

export const resolvers = {
  Query: {
    userInfo: async (_, {}, { req }) => {
      const cookie = req.headers.cookie; // get the jwt token

      if (!cookie) {
        throw new AuthenticationError('Not authenticated!');
      }

      const token = cookie.split('=')[1];

      if (!token) {
        throw new AuthenticationError('Not authenticated!');
      }

      const { user_id } = await verify(token, process.env.JWT_REFRESH_SECRET); // extract the user id
      const user = await User.findOne({ _id: user_id }); // get the user
      return user; // return the user
    }
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

    login: async (_, { email, password }, { res }) => {
      // check email address
      if (!isEmail(email)) {
        throw Error('Bad email address!');
      }

      const user = await User.findOne({ email }); // check user creds
      // user not found
      if (!user) {
        throw Error('User not found!');
      }

      const validPassword = await compare(password, user.password); // check the password
      // invalid password
      if (!validPassword) {
        throw Error('Invalid password!');
      }

      // sending the jwt along with the response
      res.cookie('jwt', sign({ user_id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '15m' }), {
        expiresIn: '15m',
        httpOnly: process.env.NODE_ENV !== 'development'
      });

      return user; // return the user
    }
  }
};
