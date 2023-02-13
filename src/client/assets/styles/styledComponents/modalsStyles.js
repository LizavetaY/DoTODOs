import { blue, blueGrey } from '@mui/material/colors';

export const setModalBgColor = (mode) => {
  switch (mode) {
    case 'light':
      return blue[300];

    case 'dark':
      return blueGrey[700];

    default:
      return '#fff';
  }
};

export const setModalBorder = (mode) => {
  switch (mode) {
    case 'light':
      return `1px solid ${blue[400]}`;

    case 'dark':
      return `1px solid ${blueGrey[800]}`;

    default:
      return '1px solid #000';
  }
};
