import { createSlice } from '@reduxjs/toolkit';

import { LOCAL_STORAGE_THEME } from '@/helpers';

let themeValue = localStorage.getItem(LOCAL_STORAGE_THEME);

if (!themeValue) {
  localStorage.setItem(LOCAL_STORAGE_THEME, 'light');

  themeValue = localStorage.getItem(LOCAL_STORAGE_THEME);
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: themeValue
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';

      localStorage.setItem(LOCAL_STORAGE_THEME, state.mode);
    }
  }
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
