import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Box, Pagination, Stack, Typography } from '@mui/material';
import { yellow } from '@mui/material/colors';
import PropTypes from 'prop-types';

import { useNavigateParams, useThemeMode } from '@/hooks';

import { TodoItem } from '../TodoItem';

const TodosList = ({
  todosData = [],
  pagesQty = 1,
  setOffset = () => {},
  isShortView = false,
  isLandingPage = false
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigateParams();
  const location = useLocation();

  const [page, setPage] = React.useState(Number(searchParams.get('page')) || 1);

  const { themeMode } = useThemeMode();

  React.useEffect(() => {
    const pageParam = Number(searchParams.get('page')) || 1;

    setOffset(pageParam - 1);
    setPage(pageParam);
  }, [location]);

  const handleChange = (event, value) => {
    setPage(value);
    navigate('/todos', { page: value });
  };

  return (
    <>
      <Stack width="100%" direction={isShortView ? 'row' : 'column'}>
        <Stack
          direction={isShortView ? 'column' : 'row'}
          alignItems="center"
          justifyContent="space-between"
          mr={isShortView ? '40px' : '0'}
          mb={isShortView ? '0' : '20px'}
          p={isShortView ? '30px 20px' : '10px 20px'}
          minWidth={isShortView ? '170px' : '100%'}
          borderRadius="20px"
          bgcolor={themeMode == 'light' ? yellow[700] : yellow[900]}
          boxShadow={1}
        >
          {!isShortView && (
            <Box sx={{ maxWidth: '10%', width: '100%', textAlign: 'center' }}>
              <Typography>Status</Typography>
            </Box>
          )}

          <Stack
            alignItems={isShortView ? 'flex-end' : 'center'}
            mt={isShortView ? '10px' : '0'}
            maxWidth={isShortView ? '100%' : '30%'}
            width="100%"
            minHeight={isShortView ? '10vh' : '100%'}
          >
            <Typography variant="h3">TODO name</Typography>
          </Stack>

          {!isLandingPage && (
            <Stack
              alignItems={isShortView ? 'flex-end' : 'center'}
              justifyContent="center"
              mt={isShortView ? '30px' : '0'}
              maxWidth={isShortView ? '100%' : '10%'}
              width="100%"
              minHeight={isShortView ? '15vh' : '100%'}
            >
              <Typography variant="h3">Note</Typography>
            </Stack>
          )}

          <Stack
            alignItems={isShortView ? 'flex-end' : 'center'}
            justifyContent="center"
            mt={isShortView ? '10px' : '0'}
            maxWidth={isShortView ? '100%' : '25%'}
            width="100%"
            minHeight={isShortView ? '10vh' : '100%'}
          >
            <Typography variant="h3">
              {isShortView ? 'Status / Deadline' : 'Deadline'}
            </Typography>
          </Stack>

          {!isShortView && (
            <Box
              sx={{
                maxWidth: '15%',
                width: '100%',
                textAlign: 'center'
              }}
            />
          )}
        </Stack>

        {!todosData?.length ? (
          <Box
            sx={{
              mt: '30px',
              textAlign: 'center'
            }}
          >
            <Typography variant="h2">No TODOs</Typography>
          </Box>
        ) : (
          <Stack justifyContent="center" flexGrow="1">
            {todosData?.map((todo) => (
              <TodoItem
                key={todo?.id}
                id={todo?.id}
                todoName={todo?.todoName}
                todoNote={todo?.todoNote}
                dateOfComplete={todo?.dateOfComplete}
                isCompleted={todo?.isCompleted}
                isOverdue={todo?.isOverdue}
                isToday={todo?.isToday}
                isShortView={isShortView}
                isLandingPage={isLandingPage}
              />
            ))}
          </Stack>
        )}

        {!!pagesQty && pagesQty > 1 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: '10px'
            }}
          >
            <Pagination count={pagesQty} page={page} onChange={handleChange} />
          </Box>
        )}
      </Stack>
    </>
  );
};

export default React.memo(TodosList);

TodosList.propTypes = {
  todosData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      todoName: PropTypes.string,
      todoNote: PropTypes.string,
      dateOfComplete: PropTypes.string,
      isCompleted: PropTypes.bool,
      isOverdue: PropTypes.bool,
      isToday: PropTypes.bool
    })
  ).isRequired,
  pagesQty: PropTypes.number,
  setOffset: PropTypes.func,
  isShortView: PropTypes.bool,
  isLandingPage: PropTypes.bool
};
