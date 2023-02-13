import React from 'react';
import { Box } from '@mui/material';
import { blueGrey, grey } from '@mui/material/colors';
import PropTypes from 'prop-types';

import { setContentWrapperBgColor } from '@/assets/styles';
import { useThemeMode } from '@/hooks';

export const ContentWrapper = ({
  children = null,
  type = 'main',
  isPublicPage
}) => {
  const { themeMode } = useThemeMode();

  const setProperties = () => {
    switch (type.toLocaleLowerCase()) {
      case 'header':
        return {
          zIndex: '9',
          px: '25px',
          minHeight: '70px',
          boxShadow: `0 0 10px ${
            themeMode == 'light' ? grey[300] : blueGrey[800]
          }`
        };

      case 'main':
      default:
        return { flexGrow: '1' };
    }
  };

  const properties = {
    position: 'relative',
    display: 'flex',
    flexDirection: isPublicPage ? 'column' : 'row',
    alignItems: type === 'header' || isPublicPage ? 'center' : 'flex-start',
    justifyContent:
      type === 'header'
        ? 'space-between'
        : isPublicPage
        ? 'center'
        : 'flex-end',
    width: '100%',
    backgroundColor: setContentWrapperBgColor(themeMode, type),
    ...setProperties()
  };

  return (
    <Box component={type} sx={properties}>
      {children}
    </Box>
  );
};

ContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  isPublicPage: PropTypes.bool
};
