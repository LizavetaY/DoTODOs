import { useDispatch, useSelector } from 'react-redux';

import { toggleTheme } from '@/store/reducers/themeSlice';

export const useThemeMode = () => {
  const dispatch = useDispatch();

  const themeMode = useSelector((state) => state.theme).mode;

  const toggleThemeMode = () => {
    dispatch(toggleTheme());
  };

  return { themeMode, toggleThemeMode };
};
