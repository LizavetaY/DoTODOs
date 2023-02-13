import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { ArrowDownward, ArrowUpward, Close, Sort } from '@mui/icons-material';
import { Box, Button, IconButton, Stack } from '@mui/material';

import { CREATE_TODO } from '@/api/mutation/todo';
import { GET_ALL_TODOS } from '@/api/query/todo';
import {
  CreateTodoModal,
  FiltersTodos,
  InformationPiece,
  ProgressBar,
  TodosList
} from '@/components';
import { getQtyOfPages } from '@/helpers';
import {
  setIsCloseCreateTodoModal,
  setIsOpenCreateTodoModal
} from '@/store/reducers/modalsSlice';
import { openNotificationBar } from '@/store/reducers/notificationBarSlice';

export const Todos = () => {
  const [filters, setFilters] = React.useState({
    todoName: '',
    todoNote: '',
    todoStatuses: []
  });
  const [sortByName, setSortByName] = React.useState({
    isActive: false,
    isIncreasing: false
  });
  const [sortByDateOfCompleted, setSortByDateOfCompleted] = React.useState({
    isActive: false,
    isIncreasing: false
  });

  const [offset, setOffset] = React.useState(0);
  const limitPerPage = 5;

  const { isOpenCreateTodoModal } = useSelector((state) => state.modals);
  const dispatch = useDispatch();

  const {
    loading: loadingTodosData,
    data: { getAllTodos: todosData } = { getAllTodos: {} }
  } = useQuery(GET_ALL_TODOS, {
    variables: {
      offset,
      limit: limitPerPage,
      sortByName: sortByName.isActive,
      isSortByNameDescending: !sortByName.isIncreasing,
      sortByDateOfCompleted: sortByDateOfCompleted.isActive,
      sortByDateOfCompletedDescending: !sortByDateOfCompleted.isIncreasing,
      filterByName: filters.todoName,
      filterByNote: filters.todoNote,
      filterByStatus: filters.todoStatuses
    },
    onError: (error) => {
      dispatch(
        openNotificationBar({
          typeOfBar: 'error',
          text: error.message
        })
      );
    }
  });

  const [createTodo, { loading: loadingCreateTodo }] = useMutation(
    CREATE_TODO,
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

  const sortByNameOnClick = () => {
    setSortByName({
      isActive: true,
      isIncreasing: !sortByName.isIncreasing
    });
  };

  const resetSortByNameOnClick = () => {
    setSortByName({
      isActive: false,
      isIncreasing: false
    });
  };

  const sortByDateOfCompletedOnClick = () => {
    setSortByDateOfCompleted({
      isActive: true,
      isIncreasing: !sortByDateOfCompleted.isIncreasing
    });
  };

  const resetSortByDateOfCompletedOnClick = () => {
    setSortByDateOfCompleted({
      isActive: false,
      isIncreasing: false
    });
  };

  const openCreateTodoModal = () => {
    dispatch(setIsOpenCreateTodoModal());
  };

  const createTodoOnSubmitMemoized = React.useCallback(
    (data) => {
      createTodo({
        variables: {
          todoName: data.todoName,
          todoNote: data.todoNote,
          dateOfComplete: data.dateOfComplete
        },
        onCompleted: () => {
          dispatch(
            openNotificationBar({
              typeOfBar: 'success',
              text: 'Creation of the TODO was successful'
            })
          );
        }
      });
      dispatch(setIsCloseCreateTodoModal());
    },
    [createTodo, dispatch]
  );

  return (
    <>
      <FiltersTodos filtersData={filters} setFiltersOnChange={setFilters} />

      {!!todosData && (
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-around"
          mt="30px"
        >
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="flex-start"
            spacing={3}
            mr="70px"
          >
            <Box sx={{ position: 'relative', width: '100%' }}>
              {sortByName.isActive && (
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    right: '-40px',
                    width: '30px',
                    height: '30px',
                    transform: 'translate(0, -50%)'
                  }}
                  onClick={resetSortByNameOnClick}
                  aria-label="Reset sort"
                >
                  <Close />
                </IconButton>
              )}

              <Button
                variant="contained"
                disabled={sortByDateOfCompleted.isActive}
                sx={{ width: '100%', height: '45px' }}
                startIcon={
                  !sortByName.isActive ? (
                    <Sort />
                  ) : sortByName.isIncreasing ? (
                    <ArrowDownward />
                  ) : (
                    <ArrowUpward />
                  )
                }
                onClick={sortByNameOnClick}
              >
                Sort by name
              </Button>
            </Box>

            <Box sx={{ position: 'relative', width: '100%' }}>
              {sortByDateOfCompleted.isActive && (
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    right: '-40px',
                    width: '30px',
                    height: '30px',
                    transform: 'translate(0, -50%)'
                  }}
                  onClick={resetSortByDateOfCompletedOnClick}
                  aria-label="Reset sort"
                >
                  <Close />
                </IconButton>
              )}

              <Button
                variant="contained"
                disabled={sortByName.isActive}
                sx={{ width: '100%', height: '45px' }}
                startIcon={
                  !sortByDateOfCompleted.isActive ? (
                    <Sort />
                  ) : sortByDateOfCompleted.isIncreasing ? (
                    <ArrowDownward />
                  ) : (
                    <ArrowUpward />
                  )
                }
                onClick={sortByDateOfCompletedOnClick}
              >
                Sort by deadline
              </Button>
            </Box>

            <InformationPiece
              title="Total TODOs:"
              text={`${todosData?.total_count}`}
              isLoading={loadingTodosData}
            />

            <InformationPiece
              title="Incomplete TODOs:"
              text={`${todosData?.incomplete_count}`}
              isLoading={loadingTodosData}
            />

            <InformationPiece
              title="Completed TODOs:"
              text={`${todosData?.total_count - todosData?.incomplete_count}`}
              isLoading={loadingTodosData}
            />

            <Button
              variant="contained"
              sx={{ width: '100%', height: '45px' }}
              onClick={openCreateTodoModal}
            >
              Create TODO
            </Button>
          </Stack>

          {(loadingTodosData && <ProgressBar isFullPage />) || (
            <TodosList
              todosData={todosData?.todos}
              pagesQty={
                getQtyOfPages(todosData?.total_count, limitPerPage) || 0
              }
              setOffset={setOffset}
            />
          )}
        </Stack>
      )}

      {isOpenCreateTodoModal && (
        <CreateTodoModal
          onSubmit={createTodoOnSubmitMemoized}
          isLoading={loadingCreateTodo}
        />
      )}
    </>
  );
};
