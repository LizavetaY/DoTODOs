import React from 'react';
import { DoneOutline } from '@mui/icons-material';
import { Icon, Typography } from '@mui/material';

import { RouterLink } from '../RouterLink';

import { UserInfo } from './UserInfo';

export const Header = () => {
  const linkStyles = {
    display: 'flex',
    alignItems: 'center'
  };

  return (
    <>
      <RouterLink linkPath="/" stylesObj={linkStyles}>
        <Icon sx={{ mr: '3px' }} aria-label="DoTODOs logo">
          <DoneOutline sx={{ width: '100%', height: '100%' }} />
        </Icon>
        <Typography variant="h1" sx={{ fontSize: '26px' }}>
          DoTODOs
        </Typography>
      </RouterLink>

      <UserInfo />
    </>
  );
};
