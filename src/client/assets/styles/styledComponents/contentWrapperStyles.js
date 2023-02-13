import { blue, blueGrey, grey } from '@mui/material/colors';

export const setContentWrapperBgColor = (mode, type) => {
  switch (mode) {
    case 'light':
      return `${type === 'header' ? grey[50] : blue[200]}`;

    case 'dark':
      return `${type === 'header' ? blueGrey[900] : blueGrey[800]}`;

    default:
      return '#fff';
  }
};
