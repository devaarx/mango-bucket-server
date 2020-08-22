import { gql } from '@apollo/client';

export const USER_INFO_QUERY = gql`
  query {
    userInfo {
      id
      email
      first_name
      last_name
      confirmed
    }
  }
`;
