import { gql } from '@apollo/client';

export const GET_ALL_TODOS = gql`
  query Todo(
    $offset: Int
    $limit: Int
    $sortByName: Boolean
    $isSortByNameDescending: Boolean
    $sortByDateOfCompleted: Boolean
    $sortByDateOfCompletedDescending: Boolean
    $filterByName: String
    $filterByNote: String
    $filterByStatus: [String]
    $filterByDateOfComplete: String
  ) {
    getAllTodos(
      offset: $offset
      limit: $limit
      sortByName: $sortByName
      isSortByNameDescending: $isSortByNameDescending
      sortByDateOfCompleted: $sortByDateOfCompleted
      sortByDateOfCompletedDescending: $sortByDateOfCompletedDescending
      filterByName: $filterByName
      filterByNote: $filterByNote
      filterByStatus: $filterByStatus
      filterByDateOfComplete: $filterByDateOfComplete
    ) {
      todos {
        id
        todoName
        todoNote
        dateOfComplete
        isCompleted
        isOverdue
        isToday
      }
      page_size
      page_number
      total_count
      total_all_count
      incomplete_count
      dates_of_complete
    }
  }
`;

export const GET_TODO = gql`
  query Todo($id: ID) {
    getTodo(id: $id) {
      id
      todoName
      todoNote
      dateOfComplete
      isCompleted
      isOverdue
      isToday
    }
  }
`;
