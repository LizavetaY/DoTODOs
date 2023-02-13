import { combineReducers } from '@reduxjs/toolkit';

import asideSlice from './asideSlice';
import calendarSlice from './calendarSlice';
import modalsSlice from './modalsSlice';
import notificationBarSlice from './notificationBarSlice';
import themeSlice from './themeSlice';

export const rootReducer = combineReducers({
  theme: themeSlice,
  notificationBar: notificationBarSlice,
  aside: asideSlice,
  modals: modalsSlice,
  calendar: calendarSlice
});
