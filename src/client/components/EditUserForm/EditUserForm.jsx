import React from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  InputBase,
  InputLabel,
  Skeleton,
  Stack,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as yup from 'yup';

import { ConfirmationModal } from '../ConfirmationModal';
import { ProgressBar } from '../ProgressBar';

const validationSchema = yup.object({
  name: yup.string('Enter your name').trim().required('Name is required'),
  surname: yup
    .string('Enter your surname')
    .trim()
    .required('Surname is required')
});

export const EditUserForm = ({
  name = '',
  surname = '',
  onSubmit = () => {},
  isLoadingData = false,
  isLoadingOnEdit = false
}) => {
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] =
    React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: name,
      surname: surname
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values, setIsEditMode);
    }
  });

  const resetFormOnClose = () => {
    setIsOpenConfirmationModal(false);
    setIsEditMode(false);
    formik.handleReset();
  };

  const editModeOnClick = () => {
    setIsEditMode(true);
  };

  const openConfirmationModal = () => {
    setIsOpenConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setIsOpenConfirmationModal(false);
  };

  return (
    <>
      <Stack
        component="form"
        mt="20px"
        p="20px 0 30px"
        width="100%"
        borderTop="1px solid #ccc"
        borderBottom="1px solid #ccc"
        onSubmit={formik.handleSubmit}
      >
        <Typography variant="h3" sx={{ mb: '20px' }}>
          {isEditMode ? 'Edit account info' : 'Account info'}
        </Typography>

        <Stack direction="row">
          <FormControl
            sx={{
              position: 'relative',
              mr: '20px',
              pb: '40px'
            }}
            fullWidth
          >
            <InputLabel
              htmlFor="name"
              required={isEditMode ? true : false}
              size="small"
              sx={{ top: '2px' }}
              error={formik.touched.name && Boolean(formik.errors.name)}
            >
              Name
            </InputLabel>
            {(!isLoadingData && (
              <InputBase
                id="name"
                size="medium"
                readOnly={isEditMode ? false : true}
                sx={{ minHeight: '45px' }}
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
              />
            )) || <Skeleton variant="rectangular" />}
            <FormHelperText
              sx={{
                position: 'absolute',
                bottom: '20px'
              }}
              error={formik.touched.name && Boolean(formik.errors.name)}
            >
              {formik.touched.name && formik.errors.name}
            </FormHelperText>
          </FormControl>

          <FormControl
            sx={{
              position: 'relative',
              pb: '40px'
            }}
            fullWidth
          >
            <InputLabel
              htmlFor="surname"
              required={isEditMode ? true : false}
              size="small"
              sx={{ top: '2px' }}
              error={formik.touched.surname && Boolean(formik.errors.surname)}
            >
              Surname
            </InputLabel>
            {(!isLoadingData && (
              <InputBase
                id="surname"
                size="medium"
                readOnly={isEditMode ? false : true}
                sx={{ minHeight: '45px' }}
                value={formik.values.surname}
                onChange={formik.handleChange}
                error={formik.touched.surname && Boolean(formik.errors.surname)}
              />
            )) || <Skeleton variant="rectangular" />}
            <FormHelperText
              sx={{
                position: 'absolute',
                bottom: '20px'
              }}
              error={formik.touched.surname && Boolean(formik.errors.surname)}
            >
              {formik.touched.surname && formik.errors.surname}
            </FormHelperText>
          </FormControl>
        </Stack>

        <Stack direction="row" justifyContent="flex-end">
          {isEditMode && (
            <Button
              variant="contained"
              sx={{ minWidth: '100px', height: '45px' }}
              type="submit"
            >
              {(isLoadingOnEdit && (
                <ProgressBar size="20px" color="inherit" />
              )) ||
                'Submit'}
            </Button>
          )}

          <Button
            variant="outlined"
            sx={{ ml: '30px', height: '45px' }}
            onClick={
              !isEditMode
                ? editModeOnClick
                : formik.dirty
                ? openConfirmationModal
                : resetFormOnClose
            }
          >
            {(isEditMode && 'Cancel') || 'Edit account'}
          </Button>
        </Stack>
      </Stack>

      {isOpenConfirmationModal && (
        <ConfirmationModal
          isOpen={isOpenConfirmationModal}
          onClose={closeConfirmationModal}
          onSubmit={resetFormOnClose}
          text="Do you really want to cancel the editing of the account? All you entered data will be lost"
          variant="danger"
        />
      )}
    </>
  );
};

EditUserForm.propTypes = {
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoadingData: PropTypes.bool,
  isLoadingOnEdit: PropTypes.bool
};
