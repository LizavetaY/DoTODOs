import { createSlice } from '@reduxjs/toolkit';

const asideSlice = createSlice({
  name: 'aside',
  initialState: {
    isOpen: false
  },
  reducers: {
    handleAside: (state) => {
      state.isOpen = !state.isOpen;
    }
  }
});

export const { handleAside } = asideSlice.actions;
export default asideSlice.reducer;
