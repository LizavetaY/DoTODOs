import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { blue } from '@mui/material/colors';
import {
  CalendarPicker,
  LocalizationProvider,
  PickersDay
} from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import PropTypes from 'prop-types';

import { useThemeMode } from '@/hooks';
import { setChosenCalendarDate } from '@/store/reducers/calendarSlice';

const Calendar = ({ datesOfCompleteArr = [] }) => {
  const { chosenDate } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const { themeMode } = useThemeMode();

  const setChosenDate = (date) => {
    dispatch(setChosenCalendarDate(date));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <CalendarPicker
        value={chosenDate}
        renderDay={(day, selectedDays, pickersDayProps) => {
          const dayFormatted = moment(day?._d).format('YYYY-MM-DD');

          return (
            <PickersDay
              {...pickersDayProps}
              day={day}
              selected={dayFormatted == chosenDate}
              sx={
                datesOfCompleteArr.includes(dayFormatted)
                  ? {
                      position: 'relative',
                      '&::before': {
                        position: 'absolute',
                        content: '""',
                        bottom: '3px',
                        left: '50%',
                        display: 'block',
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        bgcolor: themeMode == 'light' ? blue[600] : blue[300],
                        transform: 'translateX(-50%)'
                      }
                    }
                  : {}
              }
            />
          );
        }}
        onChange={(newDate) =>
          setChosenDate(moment(newDate?._d).format('YYYY-MM-DD'))
        }
      />
    </LocalizationProvider>
  );
};

export default React.memo(Calendar);

Calendar.propTypes = {
  datesOfCompleteArr: PropTypes.arrayOf(PropTypes.string)
};
