import React from 'react';
import { Stack, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import PropTypes from 'prop-types';

import { setInformationPieceTextIncompleteColor } from '@/assets/styles';
import { useThemeMode } from '@/hooks';

import { ProgressBar } from '../ProgressBar';

const InformationPiece = ({
  title = '',
  text = '',
  isLoading = false,
  isShortView = false
}) => {
  const { themeMode } = useThemeMode();

  const textStyles = {
    fontSize: '20px',
    color: setInformationPieceTextIncompleteColor(themeMode, title)
  };

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      p="10px 20px"
      maxWidth="180px"
      width="100%"
      bgcolor={themeMode == 'light' ? '#fff' : blueGrey[900]}
      borderRadius="20px"
      boxShadow={1}
      sx={isShortView ? { transform: 'scale(.8, .8)' } : {}}
    >
      <Typography variant="h3" sx={{ mb: '5px' }}>
        {title}
      </Typography>

      {(isLoading && <ProgressBar size="20px" />) || (
        <Typography variant="h2" sx={textStyles}>
          {text}
        </Typography>
      )}
    </Stack>
  );
};

export default React.memo(InformationPiece);

InformationPiece.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  isShortView: PropTypes.bool
};
