import { createTheme } from '@mui/material';
import { blue, blueGrey, grey, red, yellow } from '@mui/material/colors';

import '@/assets/styles/fonts/fonts.css';

const MuiAvatar = {
  styleOverrides: {
    root: {
      backgroundColor: yellow[900]
    }
  }
};

const MuiButton = {
  styleOverrides: {
    root: {
      borderRadius: '20px',
      color: grey[50],
      backgroundColor: blue[800],
      boxShadow: `0 1px 4px ${blueGrey[900]}`,
      '&:disabled': {
        backgroundColor: blueGrey[700],
        boxShadow: 'none'
      }
    },
    outlined: {
      border: `1px solid ${grey[50]}`,
      backgroundColor: 'transparent',
      '&:hover': {
        border: `1px solid ${yellow[900]}`,
        backgroundColor: yellow[900]
      }
    },
    danger: {
      color: grey[50],
      backgroundColor: red[500],
      '&:hover': {
        color: grey[50],
        backgroundColor: yellow[900]
      },
      '&:disabled': {
        backgroundColor: blueGrey[700],
        boxShadow: 'none'
      }
    }
  }
};

const MuiIconButton = {
  styleOverrides: {
    root: {
      color: grey[300],
      '&:hover': {
        color: yellow[900]
      }
    },
    colorInherit: {
      color: grey[300]
    },
    colorSuccess: {
      color: grey[300],
      backgroundColor: blue[800],
      '&:hover': {
        color: grey[300],
        backgroundColor: yellow[900]
      }
    },
    colorError: {
      color: grey[300],
      backgroundColor: red[500],
      '&:hover': {
        color: grey[300],
        backgroundColor: yellow[900]
      }
    }
  }
};

const MuiIcon = {
  styleOverrides: {
    root: {
      width: '30px',
      height: '30px',
      color: grey[300]
    }
  }
};

const MuiDrawer = {
  styleOverrides: {
    paper: {
      zIndex: '8',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '95px 15px 25px',
      minWidth: '70px',
      backgroundColor: blueGrey[900]
    }
  }
};

const MuiListItemButton = {
  styleOverrides: {
    root: {
      borderRadius: '50px',
      '&:hover *': {
        color: yellow[900]
      }
    }
  }
};

const MuiListItemIcon = {
  styleOverrides: {
    root: {
      color: grey[300]
    }
  }
};

const MuiTab = {
  styleOverrides: {
    root: {
      borderRadius: '20px 20px 0 0',
      backgroundColor: blueGrey[700]
    },
    textColorPrimary: {
      color: grey[300]
    }
  }
};

const MuiInputBase = {
  styleOverrides: {
    root: {
      padding: '8px 18px',
      borderRadius: '20px',
      fontSize: '14px',
      color: grey[300],
      backgroundColor: blueGrey[600]
    }
  }
};

const MuiInputLabel = {
  styleOverrides: {
    root: {
      zIndex: '2',
      padding: '0 8px',
      borderRadius: '20px',
      fontSize: '14px',
      color: grey[300],
      backgroundColor: blueGrey[600]
    }
  }
};

const MuiSelect = {
  styleOverrides: {
    root: {
      padding: '0 8px',
      maxHeight: '45px',
      borderRadius: '20px',
      fontSize: '14px',
      color: grey[300],
      backgroundColor: blueGrey[600]
    },
    icon: {
      color: grey[300]
    }
  }
};

const MuiSkeleton = {
  styleOverrides: {
    root: {
      height: '14px',
      borderRadius: '20px',
      backgroundColor: yellow[900]
    },
    rectangular: {
      height: '45px'
    }
  }
};

const MuiFormHelperText = {
  styleOverrides: {
    root: {
      fontSize: '10px'
    }
  }
};

const MuiCheckbox = {
  styleOverrides: {
    root: {
      color: grey[300]
    }
  }
};

const MuiMenu = {
  styleOverrides: {
    list: {
      backgroundColor: blueGrey[600]
    }
  }
};

const MuiAlert = {
  styleOverrides: {
    message: {
      lineHeight: 1.5
    }
  }
};

const MuiPaginationItem = {
  styleOverrides: {
    text: {
      color: grey[50]
    }
  }
};

const MuiPickersDay = {
  styleOverrides: {
    root: {
      color: grey[300],
      backgroundColor: blueGrey[700],
      '&:hover': {
        backgroundColor: blueGrey[600]
      }
    }
  }
};

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: yellow[900],
      light: yellow[600],
      dark: yellow[900]
    }
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: '700',
      lineHeight: '1',
      color: grey[300]
    },
    h2: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '1',
      color: grey[300]
    },
    h3: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '1.2',
      color: grey[300]
    },
    h4: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: '400',
      fontSize: '12px',
      lineHeight: '1',
      color: grey[300]
    },
    subtitle1: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: '300',
      fontSize: '12px',
      lineHeight: '1',
      color: grey[400]
    },
    subtitle2: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: '300',
      fontSize: '10px',
      lineHeight: '1',
      color: grey[300]
    },
    body1: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '1',
      color: grey[300]
    },
    body2: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '1',
      color: grey[300]
    },
    button: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '1',
      color: grey[300],
      textTransform: 'none'
    }
  },
  components: {
    MuiAvatar,
    MuiButton,
    MuiIconButton,
    MuiIcon,
    MuiDrawer,
    MuiListItemButton,
    MuiListItemIcon,
    MuiTab,
    MuiInputBase,
    MuiInputLabel,
    MuiSelect,
    MuiSkeleton,
    MuiFormHelperText,
    MuiCheckbox,
    MuiMenu,
    MuiAlert,
    MuiPaginationItem,
    MuiPickersDay
  }
});
