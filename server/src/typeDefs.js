import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    first_name: String
    last_name: String
    email: String!
    confirmed: String!
  }

  type Query {
    userInfo(id: String!): User
  }

  type Mutation {
    register(first_name: String, last_name: String, email: String!, password: String!): User!
    login(email: String!, password: String!): User!
  }
`;
