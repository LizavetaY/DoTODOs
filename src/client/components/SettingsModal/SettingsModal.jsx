import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { Close, Logout, PersonRemove } from '@mui/icons-material';
import { Button, IconButton, Modal, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { DELETE_USER, EDIT_USER } from '@/api/mutation/user';
import { GET_USER } from '@/api/query/user';
import { setModalBgColor, setModalBorder } from '@/assets/styles';
import { handleLogout } from '@/helpers';
import { useThemeMode } from '@/hooks';
import { openNotificationBar } from '@/store/reducers/notificationBarSlice';

import { ConfirmationModal } from '../ConfirmationModal';
import { EditUserForm } from '../EditUserForm';

const SettingsModal = ({ onClose }) => {
  const [confirmationModal, setConfirmationModal] = React.useState({
    isOpen: false,
    text: '',
    onSubmit: () => {}
  });

  const { isOpenSettingsModal } = useSelector((state) => state.modals);
  const dispatch = useDispatch();

  const client = useApolloClient();

  const { themeMode } = useThemeMode();

  const {
    loading: loadingUserData,
    data: { getUser: userData } = { getUser: {} }
  } = useQuery(GET_USER, {
    onError: (error) => {
      dispatch(
        openNotificationBar({
          typeOfBar: 'error',
          text: error.message
        })
      );
    }
  });

  const [editUser, { loading: loadingEditUser }] = useMutation(EDIT_USER, {
    refetchQueries: [GET_USER],
    onError: (error) => {
      dispatch(
        openNotificationBar({
          typeOfBar: 'error',
          text: error.message
        })
      );
    }
  });

  const [deleteUser, { loading: loadingDeleteUser }] = useMutation(
    DELETE_USER,
    {
      onError: (error) => {
        dispatch(
          openNotificationBar({
            typeOfBar: 'error',
            text: error.message
          })
        );
      }
    }
  );

  const editUserOnSubmit = (data, setIsEditMode) => {
    editUser({
      variables: {
        name: data.name,
        surname: data.surname
      },
      onCompleted: () => {
        dispatch(
          openNotificationBar({
            typeOfBar: 'success',
            text: 'Editing of the account was successful'
          })
        );
        setIsEditMode(false);
      }
    });
  };

  const resetCache = () => {
    client.resetStore();
  };

  const deleteUserOnSubmit = () => {
    deleteUser({
      onCompleted: () => {
        resetCache();
        closeConfirmationModal();
        handleLogout();
      }
    });
  };

  const openConfirmationModal = (typeOfModal) => {
    switch (typeOfModal.toLowerCase()) {
      case 'logout':
        setConfirmationModal((prevState) => ({
          ...prevState,
          isOpen: true,
          text: 'Do you really want to logout?',
          onSubmit: handleLogout
        }));
        break;

      case 'delete':
        setConfirmationModal((prevState) => ({
          ...prevState,
          isOpen: true,
          text: 'Do you really want to delete the account? All your data will be lost',
          onSubmit: deleteUserOnSubmit
        }));
        break;
    }
  };

  const closeConfirmationModal = () => {
    setConfirmationModal((prevState) => ({
      ...prevState,
      isOpen: false,
      text: '',
      onSubmit: () => {}
    }));
  };

  const modalStyles = {
    border: setModalBorder(themeMode),
    bgcolor: setModalBgColor(themeMode),
    transform: 'translate(-50%, -50%)'
  };

  return (
    <>
      <Modal open={isOpenSettingsModal}>
        <Stack
          position="absolute"
          top="50%"
          left="50%"
          p="50px 40px"
          pb="80px"
          maxWidth="500px"
          width="100%"
          borderRadius="20px"
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
            aria-label="Close settings modal"
          >
            <Close />
          </IconButton>

          <Typography variant="h2" sx={{ fontSize: '18px' }}>
            Settings
          </Typography>

          {!!userData && (
            <EditUserForm
              name={userData?.name}
              surname={userData?.surname}
              onSubmit={editUserOnSubmit}
              isLoadingData={loadingUserData}
              isLoadingOnEdit={loadingEditUser}
            />
          )}

          <Button
            variant="contained"
            sx={{ mt: '25px', mx: 'auto', width: '350px', minHeight: '45px' }}
            startIcon={<Logout aria-label="Logout button" />}
            onClick={() => openConfirmationModal('logout')}
          >
            Logout
          </Button>

          <Button
            variant="danger"
            sx={{ mt: '35px', mx: 'auto', width: '200px', minHeight: '45px' }}
            startIcon={<PersonRemove aria-label="Delete account button" />}
            onClick={() => openConfirmationModal('delete')}
          >
            Delete account
          </Button>
        </Stack>
      </Modal>

      {confirmationModal.isOpen && (
        <ConfirmationModal
          isOpen={confirmationModal.isOpen}
          onClose={closeConfirmationModal}
          onSubmit={confirmationModal.onSubmit}
          text={confirmationModal.text}
          variant="danger"
          isLoading={loadingDeleteUser}
        />
      )}
    </>
  );
};

export default React.memo(SettingsModal);

SettingsModal.propTypes = {
  onClose: PropTypes.func.isRequired
};
