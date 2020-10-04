import 'dotenv/config';
import 'reflect-metadata';
import * as express from 'express';
import * as cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { AuthResolver } from './resolvers/AuthResolver';
import { UserResolver } from './resolvers/UserResolver';
import { BucketResolver } from './resolvers/BucketResolver';
import { TaskResolver } from './resolvers/TaskResolver';

(async () => {
  const app = express(); // express instantiate
  // enable cors
  let corsOptions = { origin: 'http://localhost:3000', credentials: true };
  app.use(cors(corsOptions));
  // create typeorm postgres connection
  await createConnection();
  // create new apollo server
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthResolver, UserResolver, BucketResolver, TaskResolver]
    }),
    context: ({ req, res }) => ({ req, res }) // set req & res as the context
  });
  // after connecting to mongo apply apollo middleware
  server.applyMiddleware({ app });
  // listen to apollo server
  app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
})();
