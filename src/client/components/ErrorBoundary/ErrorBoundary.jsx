import React from 'react';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { ContentWrapper } from '../ContentWrapper';

export class ErrorBoundary extends React.Component {
  static propTypes = {
    error: PropTypes.node,
    errorInfo: PropTypes.node
  };

  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <ContentWrapper type="main" isPublicPage>
          <Typography variant="h1" sx={{ fontSize: '32px' }}>
            Ooops, something went wrong.
          </Typography>
          <Typography variant="h2" sx={{ mt: '20px' }}>
            We are sorry. Please, try again later.
          </Typography>
        </ContentWrapper>
      );
    }

    return this.props.children;
  }
}
