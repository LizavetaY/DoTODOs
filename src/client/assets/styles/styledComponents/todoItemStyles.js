import { blue, blueGrey, grey, red } from '@mui/material/colors';

export const setTodoItemBgColor = (
  mode,
  isOverdue = false,
  isCompleted = false
) => {
  switch (mode) {
    case 'light':
      if (isOverdue && !isCompleted) {
        return `${red[200]}`;
      } else if (isCompleted) {
        return `${blue[100]}`;
      }

      return `${grey[50]}`;

    case 'dark':
      if (isOverdue && !isCompleted) {
        return `${red[800]}`;
      } else if (isCompleted) {
        return `${blueGrey[900]}`;
      }

      return `${blueGrey[700]}`;

    default:
      return '#fff';
  }
};
