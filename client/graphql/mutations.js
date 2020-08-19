import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation LogIn($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      first_name
      last_name
      confirmed
    }
  }
`;
