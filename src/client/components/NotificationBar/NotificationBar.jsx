import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Close } from '@mui/icons-material';
import { Alert, IconButton, Snackbar } from '@mui/material';

import { closeNotificationBar } from '@/store/reducers/notificationBarSlice';

export const NotificationBar = () => {
  const notificationBar = useSelector((state) => state.notificationBar);
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(closeNotificationBar());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={notificationBar.isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      action={
        <IconButton
          size="small"
          color="inherit"
          onClick={handleClose}
          aria-label="Close bar"
        >
          <Close />
        </IconButton>
      }
    >
      <Alert
        elevation={6}
        variant="filled"
        severity={notificationBar.typeOfBar}
        onClose={handleClose}
      >
        {notificationBar.text}
      </Alert>
    </Snackbar>
  );
};
