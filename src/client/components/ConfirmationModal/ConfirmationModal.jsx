import React from 'react';
import { Close } from '@mui/icons-material';
import { Button, IconButton, Modal, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { setModalBgColor, setModalBorder } from '@/assets/styles';
import { useThemeMode } from '@/hooks';

import { ProgressBar } from '../ProgressBar';

export const ConfirmationModal = ({
  isOpen = false,
  onClose = () => {},
  onSubmit = () => {},
  title = '',
  text = '',
  variant = 'contained',
  isLoading = false
}) => {
  const { themeMode } = useThemeMode();

  const modalStyles = {
    border: setModalBorder(themeMode),
    bgcolor: setModalBgColor(themeMode),
    transform: 'translate(-50%, -50%)'
  };

  return (
    <Modal open={isOpen}>
      <Stack
        position="absolute"
        top="50%"
        left="50%"
        p="50px 40px"
        maxWidth="350px"
        width="100%"
        borderRadius="10px"
        boxShadow={24}
        overflow="hidden"
        sx={modalStyles}
      >
        <IconButton
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px'
          }}
          onClick={onClose}
          aria-label="Close confirmation modal"
        >
          <Close />
        </IconButton>

        {!!title && (
          <Typography variant="h2" sx={{ fontSize: '18px' }}>
            {title}
          </Typography>
        )}

        <Typography variant="h3" fontSize="14px" mt={title ? '20px' : '0'}>
          {text}
        </Typography>

        <Stack direction="row" justifyContent="flex-end" mt="25px">
          <Button variant={variant} sx={{ height: '40px' }} onClick={onSubmit}>
            {(isLoading && <ProgressBar size="20px" color="inherit" />) ||
              'Yes'}
          </Button>
          <Button
            variant="outlined"
            sx={{ ml: '30px', height: '40px' }}
            onClick={onClose}
          >
            No
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  text: PropTypes.string.isRequired,
  variant: PropTypes.string,
  isLoading: PropTypes.bool
};
