import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { Delete, Edit } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';

import { DELETE_TODO, EDIT_TODO } from '@/api/mutation/todo';
import { GET_ALL_TODOS, GET_TODO } from '@/api/query/todo';
import {
  ConfirmationModal,
  EditTodoModal,
  ProgressBar,
  TodosList
} from '@/components';
import { useNavigateParams } from '@/hooks';
import { openNotificationBar } from '@/store/reducers/notificationBarSlice';

export const Todo = () => {
  const [isOpenEditTodoModal, setIsOpenEditTodoModal] = React.useState(false);
  const [isOpenDeleteTodoModal, setIsOpenDeleteTodoModal] =
    React.useState(false);

  const dispatch = useDispatch();

  const { id } = useParams();
  const navigate = useNavigateParams();

  const {
    loading: loadingTodoData,
    data: { getTodo: todoData } = { getTodo: {} }
  } = useQuery(GET_TODO, {
    variables: {
      id: id
    },
    onError: (error) => {
      dispatch(
        openNotificationBar({
          typeOfBar: 'error',
          text: error.message
        })
      );
      navigate('/todos', { page: 1 });
    }
  });

  const [editTodo, { loading: loadingEditTodo }] = useMutation(EDIT_TODO, {
    refetchQueries: [GET_TODO],
    onError: (error) => {
      dispatch(
        openNotificationBar({
          typeOfBar: 'error',
          text: error.message
        })
      );
    }
  });

  const [deleteTodo, { loading: loadingDeleteTodo }] = useMutation(
    DELETE_TODO,
    {
      refetchQueries: [GET_ALL_TODOS],
      onError: (error) => {
        dispatch(
          openNotificationBar({
            typeOfBar: 'error',
            text: error.message
          })
        );
      }
    }
  );

  const openEditTodoModal = () => {
    setIsOpenEditTodoModal(true);
  };

  const closeEditTodoModal = () => {
    setIsOpenEditTodoModal(false);
  };

  const editTodoOnSubmit = (data) => {
    editTodo({
      variables: {
        ...todoData,
        todoName: data.todoName,
        todoNote: data.todoNote,
        dateOfComplete: data.dateOfComplete,
        isCompleted: data.isCompleted
      },
      onCompleted: () => {
        dispatch(
          openNotificationBar({
            typeOfBar: 'success',
            text: 'Editing of the TODO was successful'
          })
        );
      }
    });
    closeEditTodoModal();
  };

  const openDeleteTodoModal = () => {
    setIsOpenDeleteTodoModal(true);
  };

  const closeDeleteTodoModal = () => {
    setIsOpenDeleteTodoModal(false);
  };

  const deleteTodoOnSubmit = () => {
    deleteTodo({
      variables: {
        id: id
      },
      onCompleted: () => {
        navigate('/todos', { page: 1 });
        dispatch(
          openNotificationBar({
            typeOfBar: 'success',
            text: 'Deletion of the TODO was successful'
          })
        );
      }
    });
    closeDeleteTodoModal();
  };

  return (
    <>
      {!!todoData && (
        <>
          {(loadingTodoData && <ProgressBar isFullPage />) || (
            <TodosList todosData={[todoData]} isShortView />
          )}
        </>
      )}

      <Stack
        direction="column"
        justifyContent="space-around"
        mt="20px"
        maxWidth="170px"
      >
        <Button
          variant="contained"
          sx={{ minWidth: '170px', minHeight: '45px' }}
          startIcon={<Edit aria-label="Edit button" />}
          onClick={openEditTodoModal}
        >
          Edit TODO
        </Button>

        <Button
          variant="danger"
          sx={{ mt: '20px', minWidth: '170px', minHeight: '45px' }}
          startIcon={<Delete aria-label="Delete button" />}
          onClick={openDeleteTodoModal}
        >
          Delete TODO
        </Button>
      </Stack>

      {isOpenEditTodoModal && (
        <EditTodoModal
          todoName={todoData?.todoName}
          todoNote={todoData?.todoNote}
          dateOfComplete={todoData?.dateOfComplete}
          isCompleted={todoData?.isCompleted}
          isOverdue={todoData?.isOverdue}
          isOpen={isOpenEditTodoModal}
          onClose={closeEditTodoModal}
          onSubmit={editTodoOnSubmit}
          isLoading={loadingEditTodo}
        />
      )}

      {isOpenDeleteTodoModal && (
        <ConfirmationModal
          isOpen={isOpenDeleteTodoModal}
          onClose={closeDeleteTodoModal}
          onSubmit={deleteTodoOnSubmit}
          title="TODO deletion"
          text="Are you sure you want to delete the TODO?"
          variant="danger"
          isLoading={loadingDeleteTodo}
        />
      )}
    </>
  );
};
