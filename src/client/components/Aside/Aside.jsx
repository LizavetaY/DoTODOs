import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dashboard,
  FormatListBulleted,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Settings
} from '@mui/icons-material';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';

import { useAutoLogout, useNavigateParams, useThemeMode } from '@/hooks';
import { handleAside } from '@/store/reducers/asideSlice';
import {
  setIsCloseSettingsModal,
  setIsOpenSettingsModal
} from '@/store/reducers/modalsSlice';

import { SettingsModal } from '../SettingsModal';
import { ThemeButton } from '../ThemeButton';

export const Aside = () => {
  const { isOpen: isOpenAside } = useSelector((state) => state.aside);
  const { isOpenSettingsModal } = useSelector((state) => state.modals);
  const dispatch = useDispatch();

  const navigate = useNavigateParams();
  const { themeMode } = useThemeMode();

  const autoLogout = useAutoLogout();

  const handleDrawer = () => {
    dispatch(handleAside());
  };

  const openLandingPage = () => {
    navigate('/');
  };

  const openTodosPage = () => {
    navigate('/todos', { page: 1 });
  };

  const openSettingsModal = () => {
    dispatch(setIsOpenSettingsModal());
  };

  const closeSettingsModalMemoized = React.useCallback(
    () => dispatch(setIsCloseSettingsModal()),
    [dispatch]
  );

  return (
    <>
      {autoLogout}

      <Drawer variant="permanent" open={isOpenAside}>
        <IconButton onClick={handleDrawer} aria-label="Toggle menu button">
          {isOpenAside ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>

        <List sx={{ my: '20px', height: '100%' }}>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                p: '5px 8px',
                minWidth: '0',
                maxHeight: '45px'
              }}
              onClick={openLandingPage}
            >
              <ListItemIcon
                sx={{
                  justifyContent: 'center',
                  minWidth: '0'
                }}
                aria-label="Dashboard page button"
              >
                <Dashboard />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                sx={{
                  display: isOpenAside ? 'inline' : 'none',
                  ml: '5px'
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block', mt: '20px' }}>
            <ListItemButton
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                p: '5px 8px',
                minWidth: '0',
                maxHeight: '45px'
              }}
              onClick={openTodosPage}
            >
              <ListItemIcon
                sx={{
                  justifyContent: 'center',
                  minWidth: '0'
                }}
                aria-label="TODOs page button"
              >
                <FormatListBulleted />
              </ListItemIcon>
              <ListItemText
                primary="TODOs"
                sx={{
                  display: isOpenAside ? 'inline' : 'none',
                  ml: '5px'
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>

        <List>
          <Divider />
          <ListItem disablePadding sx={{ display: 'block', mt: '20px' }}>
            <ListItemButton
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                p: '5px 8px',
                minWidth: '0',
                maxHeight: '45px'
              }}
              onClick={openSettingsModal}
            >
              <ListItemIcon
                sx={{
                  justifyContent: 'center',
                  minWidth: '0'
                }}
                aria-label="Settings button"
              >
                <Settings />
              </ListItemIcon>
              <ListItemText
                primary="Settings"
                sx={{
                  display: isOpenAside ? 'inline' : 'none',
                  ml: '5px'
                }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block', mt: '20px' }}>
            <ThemeButton isListItemButton>
              <ListItemText
                primary={themeMode === 'light' ? 'Dark mode' : 'Light mode'}
                sx={{
                  display: isOpenAside ? 'inline' : 'none',
                  ml: '5px'
                }}
              />
            </ThemeButton>
          </ListItem>
        </List>
      </Drawer>

      {isOpenSettingsModal && (
        <SettingsModal onClose={closeSettingsModalMemoized} />
      )}
    </>
  );
};
