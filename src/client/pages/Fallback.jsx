import React from 'react';
import { Navigate } from 'react-router-dom';
import { Typography } from '@mui/material';

import { ContentWrapper } from '@/components';

export const Fallback = () => {
  return (
    <ContentWrapper type="main" isPublicPage>
      <Typography variant="h1" sx={{ fontSize: '32px' }}>
        Page does not exist
      </Typography>

      <Navigate to={'login'} replace={false} />
    </ContentWrapper>
  );
};
