import React from 'react';
import { CircularProgress, Stack } from '@mui/material';
import PropTypes from 'prop-types';

export const ProgressBar = ({
  size = '40px',
  color = 'primary',
  isFullPage = false
}) => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      my="auto"
      width="100%"
      minHeight={isFullPage ? '50vh' : null}
    >
      <CircularProgress size={size} color={color} />
    </Stack>
  );
};

ProgressBar.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  isFullPage: PropTypes.bool
};
