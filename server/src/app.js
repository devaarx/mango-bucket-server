import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';

import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

(async () => {
  // express instantiate
  const app = express();
  // create new apollo server
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });
  // connect to mongo
  await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
  // after connecting to mongo apply apollo middleware
  server.applyMiddleware({ app });
  // listen to apollo server
  app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
})();
