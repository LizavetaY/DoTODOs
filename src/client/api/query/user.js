import { gql } from '@apollo/client';

export const GET_USER = gql`
  query User {
    getUser {
      name
      surname
      email
    }
  }
`;
