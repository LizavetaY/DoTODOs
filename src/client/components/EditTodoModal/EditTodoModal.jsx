import React from 'react';
import { Close } from '@mui/icons-material';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputBase,
  InputLabel,
  Modal,
  Stack,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as yup from 'yup';

import { setModalBgColor, setModalBorder } from '@/assets/styles';
import { getDateToday } from '@/helpers';
import { useThemeMode } from '@/hooks';

import { ConfirmationModal } from '../ConfirmationModal';
import { DateRangePicker } from '../DateRangePicker';
import { ProgressBar } from '../ProgressBar';

const validationSchema = yup.object({
  todoName: yup.string('Enter a name of TODO').required('TODO name is required')
});

export const EditTodoModal = ({
  todoName = '',
  todoNote = '',
  dateOfComplete = '',
  isCompleted = false,
  isOverdue = false,
  isOpen = false,
  onClose = () => {},
  onSubmit = () => {},
  isLoading = false
}) => {
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] =
    React.useState(false);

  const { themeMode } = useThemeMode();

  const dateToday = getDateToday();

  const formik = useFormik({
    initialValues: {
      todoName: todoName,
      todoNote: todoNote,
      dateOfComplete: dateOfComplete,
      isCompleted: isCompleted
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm({ values: '' });
    }
  });

  const setDatesOnChange = (newValue) => {
    formik.setFieldValue('dateOfComplete', newValue);
  };

  const resetFormOnClose = () => {
    setIsOpenConfirmationModal(false);
    onClose();
    formik.handleReset();
  };

  const openConfirmationModal = () => {
    setIsOpenConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setIsOpenConfirmationModal(false);
  };

  const modalStyles = {
    border: setModalBorder(themeMode),
    bgcolor: setModalBgColor(themeMode),
    transform: 'translate(-50%, -50%)'
  };

  return (
    <>
      <Modal open={isOpen}>
        <Stack
          component="form"
          position="absolute"
          top="50%"
          left="50%"
          p="40px"
          pb="80px"
          maxWidth="500px"
          width="100%"
          borderRadius="10px"
          boxShadow={24}
          overflow="hidden"
          onSubmit={formik.handleSubmit}
          sx={modalStyles}
        >
          <IconButton
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px'
            }}
            onClick={formik.dirty ? openConfirmationModal : resetFormOnClose}
            aria-label="Close edit TODO modal"
          >
            <Close />
          </IconButton>

          <Typography variant="h2" sx={{ fontSize: '18px' }}>
            Add TODO
          </Typography>

          <FormControl
            sx={{
              position: 'relative',
              mt: '25px',
              pb: '40px'
            }}
            fullWidth
          >
            <InputLabel
              htmlFor="todoName"
              required
              size="small"
              sx={{ top: '2px' }}
              error={formik.touched.todoName && Boolean(formik.errors.todoName)}
            >
              Name
            </InputLabel>
            <InputBase
              id="todoName"
              size="medium"
              sx={{ minHeight: '45px' }}
              value={formik.values.todoName}
              onChange={formik.handleChange}
              error={formik.touched.todoName && Boolean(formik.errors.todoName)}
            />
            <FormHelperText
              sx={{
                position: 'absolute',
                bottom: '20px'
              }}
              error={formik.touched.todoName && Boolean(formik.errors.todoName)}
            >
              {formik.touched.todoName && formik.errors.todoName}
            </FormHelperText>
          </FormControl>

          <FormControl
            sx={{
              mb: '40px'
            }}
            fullWidth
          >
            <InputLabel htmlFor="todoName" size="small" sx={{ top: '2px' }}>
              Note
            </InputLabel>
            <InputBase
              id="todoNote"
              size="medium"
              multiline
              minRows="5"
              maxRows="5"
              sx={{ minHeight: '45px' }}
              value={formik.values.todoNote}
              onChange={formik.handleChange}
            />
          </FormControl>

          <DateRangePicker
            propertyName="dateOfComplete"
            labelText="Date of complete"
            minDate={isOverdue ? dateOfComplete : dateToday}
            dateData={formik.values.dateOfComplete}
            setDatesOnChange={setDatesOnChange}
          />

          <FormControl
            fullWidth
            sx={{
              position: 'relative',
              m: '20px 0 40px'
            }}
          >
            <FormControlLabel
              label="Is completed"
              control={
                <Checkbox
                  checked={formik.values.isCompleted}
                  name="isCompleted"
                  onChange={formik.handleChange}
                />
              }
            />
          </FormControl>

          <Stack direction="row" justifyContent="flex-end">
            <Button
              variant="contained"
              sx={{ minWidth: '100px', height: '45px' }}
              type="submit"
            >
              {(isLoading && <ProgressBar size="20px" color="inherit" />) ||
                'Submit'}
            </Button>
            <Button
              variant="outlined"
              sx={{ ml: '30px', height: '45px' }}
              onClick={formik.dirty ? openConfirmationModal : resetFormOnClose}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Modal>

      {isOpenConfirmationModal && (
        <ConfirmationModal
          isOpen={isOpenConfirmationModal}
          onClose={closeConfirmationModal}
          onSubmit={resetFormOnClose}
          text="Do you really want to cancel the adding of a new TODO? All you entered data will be lost"
          variant="danger"
        />
      )}
    </>
  );
};

EditTodoModal.propTypes = {
  todoName: PropTypes.string.isRequired,
  todoNote: PropTypes.string.isRequired,
  dateOfComplete: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  isOverdue: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};
