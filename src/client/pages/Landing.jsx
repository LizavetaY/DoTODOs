import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Stack
} from '@mui/material';
import { blue, blueGrey } from '@mui/material/colors';

import { CREATE_TODO } from '@/api/mutation/todo';
import { GET_ALL_TODOS } from '@/api/query/todo';
import {
  Calendar,
  CreateTodoModal,
  InformationPiece,
  ProgressBar,
  TodosList
} from '@/components';
import { useThemeMode } from '@/hooks';
import { resetChosenCalendarDate } from '@/store/reducers/calendarSlice';
import {
  setIsCloseCreateTodoModal,
  setIsOpenCreateTodoModal
} from '@/store/reducers/modalsSlice';
import { openNotificationBar } from '@/store/reducers/notificationBarSlice';

export const Landing = () => {
  const [isHideCompletedTodos, setIsHideCompletedTodos] = React.useState(false);

  const { isOpenCreateTodoModal } = useSelector((state) => state.modals);
  const { chosenDate } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const { themeMode } = useThemeMode();

  const {
    loading: loadingTodosData,
    data: { getAllTodos: todosData } = { getAllTodos: {} },
    refetch: refetchTodosData
  } = useQuery(GET_ALL_TODOS, {
    variables: {
      sortByDateOfCompleted: true,
      sortByDateOfCompletedDescending: true,
      filterByDateOfComplete: chosenDate,
      filterByStatus: isHideCompletedTodos ? ['incomplete'] : []
    },
    onCompleted: () => {
      refetchTodosData();
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

  const resetChosenDateOnClick = () => {
    dispatch(resetChosenCalendarDate());
  };

  const hideCompletedOnChange = (event) => {
    setIsHideCompletedTodos(event.target.checked);
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
      {!!todosData && (
        <Stack
          direction="column"
          justifyContent="flex-start"
          p="40px"
          maxHeight="80vh"
          minHeight="80vh"
          borderRadius="20px"
          bgcolor={themeMode == 'light' ? '#fff' : blueGrey[700]}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" flexGrow="1">
              <InformationPiece
                title="Total TODOs:"
                text={`${todosData?.total_count}`}
                isLoading={loadingTodosData}
                isShortView
              />

              <InformationPiece
                title="Incomplete TODOs:"
                text={`${todosData?.incomplete_count}`}
                isLoading={loadingTodosData}
                isShortView
              />

              <InformationPiece
                title="Completed TODOs:"
                text={`${todosData?.total_count - todosData?.incomplete_count}`}
                isLoading={loadingTodosData}
                isShortView
              />
            </Stack>

            <Button
              variant="contained"
              sx={{ height: '45px' }}
              onClick={openCreateTodoModal}
            >
              Create TODO
            </Button>
          </Stack>

          <Stack direction="row" mt="20px">
            <Stack alignItems="center" justifyContent="space-between" mr="30px">
              <Stack alignItems="center" justifyContent="flex-start">
                <Calendar datesOfCompleteArr={todosData?.dates_of_complete} />

                {chosenDate && (
                  <Button
                    variant="danger"
                    sx={{ maxWidth: '100px', height: '45px' }}
                    onClick={resetChosenDateOnClick}
                  >
                    Reset
                  </Button>
                )}
              </Stack>

              {(todosData?.incomplete_count != todosData?.total_all_count ||
                !!todosData?.total_all_count) && (
                <Box
                  sx={{
                    width: '100%',
                    textAlign: 'center'
                  }}
                >
                  <FormControl>
                    <FormControlLabel
                      label="Hide completed"
                      control={
                        <Checkbox
                          checked={isHideCompletedTodos}
                          name="hideCompleted"
                          onChange={hideCompletedOnChange}
                        />
                      }
                    />
                  </FormControl>
                </Box>
              )}
            </Stack>

            {(loadingTodosData && <ProgressBar isFullPage />) || (
              <Box
                sx={{
                  width: '80%',
                  borderRadius: '20px',
                  bgcolor: themeMode == 'light' ? blue[200] : blueGrey[600]
                }}
              >
                <Box
                  sx={{
                    p: '5px 20px',
                    maxHeight: '60vh',
                    minHeight: '60vh',
                    overflowY: 'scroll',
                    transform: 'scale(.9, .9)'
                  }}
                >
                  <TodosList todosData={todosData?.todos} isLandingPage />
                </Box>
              </Box>
            )}
          </Stack>
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
