import React from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputBase,
  InputLabel,
  Stack
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
    .required('Surname is required'),

  email: yup
    .string('Enter your email')
    .trim()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .trim()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required')
});

export const SignUpForm = ({ onSubmit = () => {}, isLoading = false }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] =
    React.useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values, formik.handleReset);
    }
  });

  const handleClickShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const resetFormOnClose = () => {
    setIsOpenConfirmationModal(false);
    formik.handleReset();
  };

  const openConfirmationModal = () => {
    setIsOpenConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setIsOpenConfirmationModal(false);
  };

  return (
    <>
      <Box
        component="form"
        sx={{ position: 'relative', zIndex: '1', minWidth: '300px' }}
        onSubmit={formik.handleSubmit}
      >
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
              required
              size="small"
              sx={{ top: '2px' }}
              error={formik.touched.name && Boolean(formik.errors.name)}
            >
              Name
            </InputLabel>
            <InputBase
              id="name"
              size="medium"
              sx={{ minHeight: '45px' }}
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
            />
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
              required
              size="small"
              sx={{ top: '2px' }}
              error={formik.touched.surname && Boolean(formik.errors.surname)}
            >
              Surname
            </InputLabel>
            <InputBase
              id="surname"
              size="medium"
              sx={{ minHeight: '45px' }}
              value={formik.values.surname}
              onChange={formik.handleChange}
              error={formik.touched.surname && Boolean(formik.errors.surname)}
            />
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

        <FormControl
          sx={{
            position: 'relative',
            pb: '40px'
          }}
          fullWidth
        >
          <InputLabel
            htmlFor="email"
            required
            size="small"
            sx={{ top: '2px' }}
            error={formik.touched.email && Boolean(formik.errors.email)}
          >
            Email
          </InputLabel>
          <InputBase
            id="email"
            size="medium"
            sx={{ minHeight: '45px' }}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
          />
          <FormHelperText
            sx={{
              position: 'absolute',
              bottom: '20px'
            }}
            error={formik.touched.email && Boolean(formik.errors.email)}
          >
            {formik.touched.email && formik.errors.email}
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
            htmlFor="password"
            required
            size="small"
            sx={{ top: '2px' }}
            error={formik.touched.password && Boolean(formik.errors.password)}
          >
            Password
          </InputLabel>
          <InputBase
            id="password"
            size="medium"
            sx={{ minHeight: '45px' }}
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText
            sx={{ position: 'absolute', bottom: '20px' }}
            error={formik.touched.password && Boolean(formik.errors.password)}
          >
            {formik.touched.password && formik.errors.password}
          </FormHelperText>
        </FormControl>

        <Stack direction="row" justifyContent="space-between">
          <Button
            variant="contained"
            sx={{ width: '100%', minWidth: '100px', height: '45px' }}
            type="submit"
          >
            {(isLoading && <ProgressBar size="20px" color="inherit" />) ||
              'Submit'}
          </Button>
          {formik.dirty && (
            <Button
              variant="outlined"
              sx={{ ml: '30px', width: '100%', height: '45px' }}
              onClick={formik.dirty ? openConfirmationModal : resetFormOnClose}
            >
              Reset
            </Button>
          )}
        </Stack>
      </Box>

      {isOpenConfirmationModal && (
        <ConfirmationModal
          isOpen={isOpenConfirmationModal}
          onClose={closeConfirmationModal}
          onSubmit={resetFormOnClose}
          text="Do you really want to cancel sign up process? All you entered data will be lost"
          variant="danger"
        />
      )}
    </>
  );
};

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};
