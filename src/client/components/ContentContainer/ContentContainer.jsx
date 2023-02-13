import React from 'react';
import { Stack } from '@mui/material';
import PropTypes from 'prop-types';

export const ContentContainer = ({ children = null }) => {
  return (
    <Stack flexDirection="column" m="20px 50px 20px 120px" width="90%">
      {children}
    </Stack>
  );
};

ContentContainer.propTypes = {
  children: PropTypes.node.isRequired
};
