import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

export const TabPanel = ({ children = null, value = 0, index = 0 }) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
    >
      {value === index && children}
    </Box>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
};
