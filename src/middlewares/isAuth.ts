import { MiddlewareFn } from 'type-graphql';
import { verify } from 'jsonwebtoken';
import { Context } from '../interfaces/context';

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  const authorization = context.req.headers.cookie; // request cookie

  if (!authorization) {
    throw new Error('not authenticated');
  }

  try {
    const token = authorization.split('=')[1]; // extract the token from cookie
    const payload = verify(token, process.env.JWT_SECRET_TOKEN); // validate cookie
    context.user = payload as any; // set the user in req context
  } catch (err) {
    console.log(err);
    throw new Error('not authenticated');
  }

  return next();
};
