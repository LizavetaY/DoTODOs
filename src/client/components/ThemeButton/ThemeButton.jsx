import React from 'react';
import { DarkMode, LightMode } from '@mui/icons-material';
import { IconButton, ListItemButton, ListItemIcon } from '@mui/material';
import PropTypes from 'prop-types';

import { useThemeMode } from '@/hooks';

export const ThemeButton = ({
  children = null,
  isListItemButton = false,
  stylesObj = {}
}) => {
  const { themeMode, toggleThemeMode } = useThemeMode();

  return (
    <>
      {isListItemButton ? (
        <ListItemButton
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            p: '5px 8px',
            minWidth: '0',
            maxHeight: '45px',
            ...stylesObj
          }}
          onClick={toggleThemeMode}
        >
          <ListItemIcon
            sx={{
              justifyContent: 'center',
              minWidth: '0'
            }}
            aria-label="Theme toggle button"
          >
            {themeMode === 'light' ? <DarkMode /> : <LightMode />}
            {children}
          </ListItemIcon>
        </ListItemButton>
      ) : (
        <IconButton
          sx={stylesObj}
          onClick={toggleThemeMode}
          aria-label="Theme toggle button"
        >
          {themeMode === 'light' ? <DarkMode /> : <LightMode />}
        </IconButton>
      )}
    </>
  );
};

ThemeButton.propTypes = {
  children: PropTypes.node,
  isListItemButton: PropTypes.bool,
  stylesObj: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  )
};
