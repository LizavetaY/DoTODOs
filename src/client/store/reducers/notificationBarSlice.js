import { createSlice } from '@reduxjs/toolkit';

const notificationBarSlice = createSlice({
  name: 'notificationBar',
  initialState: {
    isOpen: false,
    typeOfBar: 'success',
    text: ''
  },
  reducers: {
    openNotificationBar: (state, action) => {
      state.isOpen = true;
      state.typeOfBar = action.payload.typeOfBar;
      state.text = action.payload.text;
    },
    closeNotificationBar: (state) => {
      state.isOpen = false;
    }
  }
});

export const { openNotificationBar, closeNotificationBar } =
  notificationBarSlice.actions;
export default notificationBarSlice.reducer;
