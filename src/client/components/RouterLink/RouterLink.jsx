import React from 'react';
import { Link as LinkReact } from 'react-router-dom';
import { Link } from '@mui/material';
import PropTypes from 'prop-types';

export const RouterLink = ({
  children = null,
  linkPath = '/',
  stylesObj = {}
}) => {
  return (
    <Link component={LinkReact} to={linkPath} underline="none" sx={stylesObj}>
      {children}
    </Link>
  );
};

RouterLink.propTypes = {
  children: PropTypes.node.isRequired,
  linkPath: PropTypes.string.isRequired,
  stylesObj: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  )
};
