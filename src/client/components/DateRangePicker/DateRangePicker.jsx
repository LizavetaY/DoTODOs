import * as React from 'react';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputBase,
  InputLabel
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import PropTypes from 'prop-types';

export const DateRangePicker = ({
  propertyName = '',
  labelText = '',
  minDate = null,
  dateData = '',
  setDatesOnChange = () => {}
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        label={labelText}
        value={dateData}
        minDate={minDate}
        onChange={(newValue) => {
          let formattedDate = propertyName.toLowerCase().includes('start')
            ? moment(newValue?._d).format('YYYY-MM-DD')
            : moment(newValue?._d).format('YYYY-MM-DD');

          setDatesOnChange(formattedDate);
        }}
        renderInput={({ inputRef, inputProps, InputProps, label }) => {
          return (
            <FormControl
              sx={{
                position: 'relative'
              }}
              fullWidth
            >
              <InputLabel
                htmlFor={propertyName}
                size="small"
                sx={{ top: '2px' }}
              >
                {label}
              </InputLabel>
              <InputBase
                id={propertyName}
                size="medium"
                sx={{ minHeight: '45px' }}
                ref={inputRef}
                {...inputProps}
                readOnly
                endAdornment={
                  InputProps?.endAdornment ? (
                    <InputAdornment {...InputProps?.endAdornment?.props}>
                      <IconButton
                        {...InputProps?.endAdornment?.props?.children?.props}
                      />
                    </InputAdornment>
                  ) : null
                }
              />
            </FormControl>
          );
        }}
      />
    </LocalizationProvider>
  );
};

DateRangePicker.propTypes = {
  propertyName: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  minDate: PropTypes.string,
  dateData: PropTypes.string.isRequired,
  setDatesOnChange: PropTypes.func.isRequired
};
