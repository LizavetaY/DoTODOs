import { createSlice } from '@reduxjs/toolkit';

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    chosenDate: ''
  },
  reducers: {
    setChosenCalendarDate: (state, action) => {
      state.chosenDate = action.payload;
    },
    resetChosenCalendarDate: (state) => {
      state.chosenDate = '';
    }
  }
});

export const { setChosenCalendarDate, resetChosenCalendarDate } =
  calendarSlice.actions;
export default calendarSlice.reducer;
