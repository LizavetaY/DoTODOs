import React from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import { Avatar, Skeleton, Stack, Typography } from '@mui/material';

import { GET_USER } from '@/api/query/user';
import userImage from '@/assets/img/fromServer/cat.jpg';
import { openNotificationBar } from '@/store/reducers/notificationBarSlice';

export const UserInfo = () => {
  const dispatch = useDispatch();

  const {
    loading: loadingUserData,
    data: { getUser: userData } = { getUser: {} }
  } = useQuery(GET_USER, {
    onError: (error) => {
      dispatch(
        openNotificationBar({
          typeOfBar: 'error',
          text: error.message
        })
      );
    }
  });

  const userInfoMemoized = React.useMemo(() => {
    return (
      <Stack alignItems="flex-start" justifyContent="center">
        <Typography variant="h3">
          {(!loadingUserData && `${userData?.name} ${userData?.surname}`) || (
            <Skeleton sx={{ minWidth: '100px' }} />
          )}
        </Typography>

        <Typography variant="subtitle1" sx={{ mt: '3px' }}>
          {(!loadingUserData && userData?.email) || (
            <Skeleton sx={{ minWidth: '100px' }} />
          )}
        </Typography>
      </Stack>
    );
  }, [loadingUserData, userData?.name, userData?.surname, userData?.email]);

  return (
    <>
      {!!userData && (
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Avatar
            sx={{
              mr: '10px',
              width: '40px',
              height: '40px'
            }}
            alt="Profile image"
            src={userImage}
          />

          {userInfoMemoized}
        </Stack>
      )}
    </>
  );
};
