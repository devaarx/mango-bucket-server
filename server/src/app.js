import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';

import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

(async () => {
  const app = express(); // express instantiate
  // enable cors
  var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
  };
  app.use(cors(corsOptions));
  // create new apollo server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }) // set req & res as the context
  });
  // connect to mongo
  await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  // after connecting to mongo apply apollo middleware
  server.applyMiddleware({ app });
  // listen to apollo server
  app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
})();
