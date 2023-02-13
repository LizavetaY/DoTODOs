import { blueGrey, green, grey, red } from '@mui/material/colors';

export const setInformationPieceTextIncompleteColor = (mode, title) => {
  if (title.toLowerCase().includes('incomplete')) {
    return `${red[900]}`;
  } else if (title.toLowerCase().includes('completed')) {
    return `${green[700]}`;
  }

  switch (mode) {
    case 'light':
      return `${blueGrey[900]}`;

    case 'dark':
      return `${grey[50]}`;

    default:
      return '#fff';
  }
};
