import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Description, Edit, MoreVert } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Icon,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { yellow } from '@mui/material/colors';
import PropTypes from 'prop-types';

import { EDIT_TODO } from '@/api/mutation/todo';
import { GET_ALL_TODOS, GET_TODO } from '@/api/query/todo';
import { setTodoItemBgColor } from '@/assets/styles';
import { useNavigateParams, useThemeMode } from '@/hooks';
import { openNotificationBar } from '@/store/reducers/notificationBarSlice';

import { EditTodoModal } from '../EditTodoModal';

const TodoItem = ({
  id = '',
  todoName = '',
  todoNote = '',
  dateOfComplete = '',
  isCompleted = false,
  isOverdue = false,
  isToday = false,
  isShortView = false,
  isLandingPage = false
}) => {
  const [isOpenEditTodoModal, setIsOpenEditTodoModal] = React.useState(false);

  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const navigate = useNavigateParams();

  const { themeMode } = useThemeMode();

  const [editTodo, { loading: loadingEditTodo }] = useMutation(EDIT_TODO, {
    refetchQueries:
      pathname.includes('todos') || pathname === '/'
        ? [GET_ALL_TODOS]
        : [GET_TODO],
    onError: (error) => {
      dispatch(
        openNotificationBar({
          typeOfBar: 'error',
          text: error.message
        })
      );
    }
  });

  const editTodoOnComplete = (event) => {
    editTodo({
      variables: {
        id: id,
        isCompleted: event.target.checked
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
  };

  const openEditTodoModal = () => {
    setIsOpenEditTodoModal(true);
  };

  const closeEditTodoModalMemoized = React.useCallback(
    () => setIsOpenEditTodoModal(false),
    []
  );

  const editTodoOnSubmitMemoized = React.useCallback(
    (data) => {
      editTodo({
        variables: {
          id: id,
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
      closeEditTodoModalMemoized();
    },
    [editTodo, id, dispatch, closeEditTodoModalMemoized]
  );

  const openTodoPage = () => {
    navigate(`/todo/${encodeURIComponent(id)}`);
  };

  const todoItemStyles = {
    bgcolor: setTodoItemBgColor(themeMode, isOverdue, isCompleted)
  };

  return (
    <>
      <Stack
        position="relative"
        direction={isShortView ? 'column' : 'row'}
        alignItems="center"
        justifyContent="space-between"
        mb={isShortView ? '0' : '10px'}
        p={isShortView ? '30px' : '10px 20px'}
        borderRadius="20px"
        boxShadow={1}
        sx={todoItemStyles}
      >
        {(isOverdue || isToday) && (
          <Stack
            position="absolute"
            top="0"
            left="-10px"
            p="2px 5px"
            bgcolor={themeMode == 'light' ? yellow[700] : yellow[900]}
            borderRadius="10px"
          >
            <Typography variant={isShortView ? 'h3' : 'subtitle2'}>
              {isOverdue ? (isCompleted ? 'PAST' : 'OVERDUE') : 'TODAY'}
            </Typography>
          </Stack>
        )}

        {!isShortView && (
          <Box
            sx={{
              maxWidth: '10%',
              width: '100%',
              textAlign: 'center'
            }}
          >
            <FormControl>
              <Checkbox
                checked={isCompleted}
                name="isCompleted"
                onChange={editTodoOnComplete}
              />
            </FormControl>
          </Box>
        )}

        <Box
          sx={
            isShortView
              ? {
                  display: 'flex',
                  justifyContent: 'center',
                  mt: '10px',
                  px: '20px',
                  width: '100%',
                  minHeight: '10vh',
                  maxHeight: '10vh',
                  textAlign: 'center',
                  overflow: 'auto'
                }
              : {
                  maxWidth: '30%',
                  width: '100%',
                  textAlign: 'left'
                }
          }
        >
          {(!isShortView && todoName.length > 20 && (
            <Tooltip title={todoName} sx={{ cursor: 'pointer' }}>
              <Typography
                variant="h3"
                sx={
                  (isCompleted && {
                    textDecoration: 'line-through'
                  }) ||
                  {}
                }
              >
                {`${todoName.slice(0, 20)}...`}
              </Typography>
            </Tooltip>
          )) || (
            <Typography
              variant="h3"
              fontWeight={isShortView ? 'bold' : 'regular'}
              sx={
                (isCompleted && {
                  textDecoration: 'line-through'
                }) ||
                {}
              }
            >
              {todoName}
            </Typography>
          )}
        </Box>

        {!isLandingPage && (
          <Stack
            alignItems={isShortView ? 'flex-start' : 'center'}
            mt={isShortView ? '30px' : '0'}
            p={isShortView ? '20px' : '0'}
            maxWidth={isShortView ? '100%' : '10%'}
            minHeight={isShortView ? '15vh' : '100%'}
            maxHeight={isShortView ? '15vh' : '100%'}
            width="100%"
            border={isShortView ? '1px solid #ccc' : 'none'}
            borderRadius={isShortView ? '20px' : 'none'}
            overflow={isShortView ? 'auto' : 'inherit'}
          >
            {(!isShortView && todoNote && (
              <Tooltip title={todoNote} sx={{ cursor: 'pointer' }}>
                <Icon
                  sx={{ width: '25px', maxHeight: '25px' }}
                  aria-label="Note icon"
                >
                  <Description sx={{ width: '100%', height: '100%' }} />
                </Icon>
              </Tooltip>
            )) || <Typography variant="h3">{todoNote}</Typography>}
          </Stack>
        )}

        <Stack
          direction={isShortView ? 'row' : 'column'}
          alignItems="center"
          justifyContent="center"
          mt={isShortView ? '10px' : '0'}
          maxWidth={isShortView ? '100%' : '25%'}
          width="100%"
          minHeight={isShortView ? '10vh' : '100%'}
        >
          {isShortView && (
            <FormControl sx={{ mr: '70px' }}>
              <FormControlLabel
                label="Is completed"
                control={
                  <Checkbox
                    checked={isCompleted}
                    name="isCompleted"
                    onChange={editTodoOnComplete}
                  />
                }
              />
            </FormControl>
          )}

          <Typography variant="h3">{dateOfComplete}</Typography>
        </Stack>

        {!isShortView && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              maxWidth: '15%',
              width: '100%'
            }}
          >
            {!isLandingPage && (
              <IconButton
                color="success"
                sx={{
                  mr: '10px',
                  width: '35px',
                  maxHeight: '35px'
                }}
                onClick={openEditTodoModal}
                aria-label="Edit TODO"
              >
                <Edit sx={{ width: '100%', height: '100%' }} />
              </IconButton>
            )}

            <IconButton
              color="success"
              sx={{
                width: '35px',
                maxHeight: '35px'
              }}
              onClick={openTodoPage}
              aria-label="Open TODO"
            >
              <MoreVert sx={{ width: '100%', height: '100%' }} />
            </IconButton>
          </Box>
        )}
      </Stack>

      {isOpenEditTodoModal && (
        <EditTodoModal
          todoName={todoName}
          todoNote={todoNote}
          dateOfComplete={dateOfComplete}
          isCompleted={isCompleted}
          isOverdue={isOverdue}
          isOpen={isOpenEditTodoModal}
          onClose={closeEditTodoModalMemoized}
          onSubmit={editTodoOnSubmitMemoized}
          isLoading={loadingEditTodo}
        />
      )}
    </>
  );
};

export default React.memo(TodoItem);

TodoItem.propTypes = {
  id: PropTypes.string.isRequired,
  todoName: PropTypes.string.isRequired,
  todoNote: PropTypes.string.isRequired,
  dateOfComplete: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  isOverdue: PropTypes.bool.isRequired,
  isToday: PropTypes.bool.isRequired,
  isShortView: PropTypes.bool,
  isLandingPage: PropTypes.bool
};
