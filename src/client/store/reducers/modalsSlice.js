import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    isOpenSettingsModal: false,
    isOpenCreateTodoModal: false
  },
  reducers: {
    setIsOpenSettingsModal: (state) => {
      state.isOpenSettingsModal = true;
    },
    setIsCloseSettingsModal: (state) => {
      state.isOpenSettingsModal = false;
    },
    setIsOpenCreateTodoModal: (state) => {
      state.isOpenCreateTodoModal = true;
    },
    setIsCloseCreateTodoModal: (state) => {
      state.isOpenCreateTodoModal = false;
    }
  }
});

export const {
  setIsOpenSettingsModal,
  setIsCloseSettingsModal,
  setIsOpenCreateTodoModal,
  setIsCloseCreateTodoModal
} = modalsSlice.actions;
export default modalsSlice.reducer;
