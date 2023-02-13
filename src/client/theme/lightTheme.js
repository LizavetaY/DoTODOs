import { createTheme } from '@mui/material';
import { blue, blueGrey, grey, red, yellow } from '@mui/material/colors';

import '@/assets/styles/fonts/fonts.css';

const MuiAvatar = {
  styleOverrides: {
    root: {
      backgroundColor: yellow[700]
    }
  }
};

const MuiButton = {
  styleOverrides: {
    root: {
      borderRadius: '20px',
      color: grey[50],
      backgroundColor: blue[600],
      boxShadow: `0 1px 4px ${grey[500]}`,
      '&:disabled': {
        backgroundColor: grey[200],
        boxShadow: 'none'
      }
    },
    outlined: {
      border: `1px solid ${blue[600]}`,
      color: blue[600],
      backgroundColor: blue[50],
      '&:hover': {
        border: `1px solid ${yellow[700]}`,
        backgroundColor: yellow[700]
      }
    },
    danger: {
      color: grey[50],
      backgroundColor: red[700],
      '&:hover': {
        color: grey[50],
        backgroundColor: yellow[700]
      },
      '&:disabled': {
        backgroundColor: grey[200],
        boxShadow: 'none'
      }
    }
  }
};

const MuiIconButton = {
  styleOverrides: {
    root: {
      color: blue[600],
      '&:hover': {
        color: yellow[700]
      }
    },
    colorInherit: {
      color: grey[50]
    },
    colorSuccess: {
      color: grey[50],
      backgroundColor: blue[600],
      '&:hover': {
        color: blueGrey[900],
        backgroundColor: yellow[700]
      }
    },
    colorError: {
      color: grey[50],
      backgroundColor: red[700],
      '&:hover': {
        color: blueGrey[900],
        backgroundColor: yellow[700]
      }
    }
  }
};

const MuiIcon = {
  styleOverrides: {
    root: {
      width: '30px',
      height: '30px',
      color: blueGrey[900]
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
      backgroundColor: blue[50]
    }
  }
};

const MuiListItemButton = {
  styleOverrides: {
    root: {
      borderRadius: '50px',
      '&:hover *': {
        color: yellow[700]
      }
    }
  }
};

const MuiListItemIcon = {
  styleOverrides: {
    root: {
      color: blue[600]
    }
  }
};

const MuiTab = {
  styleOverrides: {
    root: {
      borderRadius: '20px 20px 0 0',
      backgroundColor: '#fff'
    },
    textColorPrimary: {
      color: blueGrey[800]
    }
  }
};

const MuiInputBase = {
  styleOverrides: {
    root: {
      padding: '8px 18px',
      borderRadius: '20px',
      fontSize: '14px',
      color: blue[600],
      backgroundColor: blue[50]
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
      color: blue[600],
      backgroundColor: blue[50]
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
      color: blue[600],
      backgroundColor: blue[50]
    },
    icon: {
      color: blue[600]
    }
  }
};

const MuiSkeleton = {
  styleOverrides: {
    root: {
      height: '14px',
      borderRadius: '20px',
      backgroundColor: yellow[700]
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

const MuiAlert = {
  styleOverrides: {
    message: {
      lineHeight: 1.5
    }
  }
};

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: yellow[700],
      light: yellow[300],
      dark: yellow[700]
    }
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: '700',
      lineHeight: '1',
      color: blueGrey[900]
    },
    h2: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '1',
      color: blueGrey[900]
    },
    h3: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '1.2',
      color: blueGrey[900]
    },
    h4: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: '400',
      fontSize: '12px',
      lineHeight: '1',
      color: blueGrey[900]
    },
    subtitle1: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: '300',
      fontSize: '12px',
      lineHeight: '1',
      color: grey[600]
    },
    subtitle2: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: '300',
      fontSize: '10px',
      lineHeight: '1',
      color: blueGrey[900]
    },
    body1: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '1',
      color: blueGrey[900]
    },
    body2: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '1',
      color: blueGrey[900]
    },
    button: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '1',
      color: blueGrey[900],
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
    MuiAlert
  }
});
