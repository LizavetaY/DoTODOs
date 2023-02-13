import { gql } from '@apollo/client';

export const CREATE_TODO = gql`
  mutation createTodo(
    $todoName: String!
    $todoNote: String
    $dateOfComplete: String
  ) {
    createTodo(
      todoName: $todoName
      todoNote: $todoNote
      dateOfComplete: $dateOfComplete
    ) {
      todoName
      todoNote
      dateOfComplete
      isCompleted
      isOverdue
    }
  }
`;

export const EDIT_TODO = gql`
  mutation editTodo(
    $id: ID!
    $todoName: String
    $todoNote: String
    $dateOfComplete: String
    $isCompleted: Boolean
  ) {
    editTodo(
      id: $id
      todoName: $todoName
      todoNote: $todoNote
      dateOfComplete: $dateOfComplete
      isCompleted: $isCompleted
    ) {
      todoName
      todoNote
      dateOfComplete
      isCompleted
      isOverdue
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      todoName
      todoNote
      dateOfComplete
      isCompleted
      isOverdue
    }
  }
`;
