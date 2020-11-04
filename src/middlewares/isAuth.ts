import { MiddlewareFn } from 'type-graphql';
import { verify } from 'jsonwebtoken';
import { Context } from '../interfaces/context';

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  const jwtToken = context.req.cookies.jwt; // request cookie

  if (!jwtToken) {
    throw new Error('not authenticated');
  }

  try {
    const payload = verify(jwtToken, process.env.JWT_SECRET_TOKEN); // validate cookie
    context.user = payload as any; // set the user in req context
  } catch (err) {
    console.log(err);
    throw new Error('not authenticated');
  }

  return next();
};
