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
  InputLabel
} from '@mui/material';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as yup from 'yup';

import { ProgressBar } from '../ProgressBar';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required')
});

export const LoginForm = ({ onSubmit = () => {}, isLoading = false }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm({ values: '' });
    }
  });

  const handleClickShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <Box
      component="form"
      sx={{ position: 'relative', zIndex: '1', minWidth: '200px' }}
      onSubmit={formik.handleSubmit}
    >
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

      <Button
        sx={{ height: '45px' }}
        variant="contained"
        fullWidth
        type="submit"
      >
        {(isLoading && <ProgressBar size="20px" color="inherit" />) || 'Login'}
      </Button>
    </Box>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};
