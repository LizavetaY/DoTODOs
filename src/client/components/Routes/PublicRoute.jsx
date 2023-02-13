import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { isTokenValid } from '@/helpers';

export const PublicRoute = ({
  children = null,
  restricted = false,
  redirectTo = '/'
}) => {
  const shouldRedirect = isTokenValid() && restricted;

  return (
    <>
      {shouldRedirect ? <Navigate to={redirectTo} replace={false} /> : children}
    </>
  );
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
  restricted: PropTypes.bool,
  redirectTo: PropTypes.string
};
