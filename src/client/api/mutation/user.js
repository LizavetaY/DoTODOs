import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation signUp(
    $name: String!
    $surname: String!
    $email: String!
    $password: String!
  ) {
    signUp(name: $name, surname: $surname, email: $email, password: $password) {
      name
      surname
      email
      password
    }
  }
`;

export const EDIT_USER = gql`
  mutation User($name: String!, $surname: String!) {
    editUser(name: $name, surname: $surname) {
      name
      surname
    }
  }
`;

export const DELETE_USER = gql`
  mutation User {
    deleteUser {
      id
    }
  }
`;
