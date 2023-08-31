import { orange } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { grey, sapientWhite } from './colors';

export const globalTheme = createTheme({
  palette: {
    primary: {
      main: '#0A4894',
    },
    secondary: {
      main: '#449FF8',
    },
    background: {
      default: '#fff',
      paper: grey[200],
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#EEEEEE',
      300: '#e0e0e0',
      400: '#B4B4B4',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#000000',
      A100: '#f5f5f5',
      A200: '#eeeeee',
      A400: '#bdbdbd',
      A700: '#616161',
    },
  },
  typography: {
    fontFamily: ['"Open Sans"', 'sans-serif'].join(','),
    h1: {
      fontSize: 24,
      fontWeight: 500,
      lineHeight: '133%',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: sapientWhite,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          a: {
            color: grey[900],
            fontSize: 14,
            fontWeight: '600',
            textDecoration: 'none',
          },
        },
      },
    },
    MuiMobileStepper: {
      styleOverrides: {
        root: {
          background: '#fff',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: sapientWhite,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          background: sapientWhite,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '	.MuiFormHelperText-root': {
            position: 'absolute',
            top: '55px',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            color: 'var(--text-secondary, rgba(0, 0, 0, 0.60))',
          },
        },
      },
    },
  },
});
