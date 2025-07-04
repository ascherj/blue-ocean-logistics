import { createTheme } from '@mui/material/styles';

// Ocean-inspired color palette
const oceanColors = {
  deepBlue: '#003366',
  oceanTeal: '#008080',
  seafoamGreen: '#93E9BE',
  navyBlue: '#1e3a8a',
  lightBlue: '#e0f2fe',
  darkTeal: '#004d4d',
  coral: '#ff7f7f',
  sand: '#f5f5dc',
  white: '#ffffff',
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
};

// Create the custom theme
export const oceanTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: oceanColors.deepBlue,
      light: oceanColors.lightBlue,
      dark: oceanColors.navyBlue,
      contrastText: oceanColors.white,
    },
    secondary: {
      main: oceanColors.oceanTeal,
      light: oceanColors.seafoamGreen,
      dark: oceanColors.darkTeal,
      contrastText: oceanColors.white,
    },
    success: {
      main: oceanColors.seafoamGreen,
      dark: '#66d9a6',
      contrastText: oceanColors.deepBlue,
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
    },
    error: {
      main: oceanColors.coral,
      light: '#ffb3b3',
      dark: '#cc6666',
    },
    background: {
      default: oceanColors.lightBlue,
      paper: oceanColors.white,
    },
    text: {
      primary: oceanColors.deepBlue,
      secondary: oceanColors.grey[600],
    },
    grey: oceanColors.grey,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: oceanColors.deepBlue,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: oceanColors.deepBlue,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: oceanColors.deepBlue,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: oceanColors.deepBlue,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: oceanColors.deepBlue,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      color: oceanColors.deepBlue,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 24px',
          fontSize: '0.875rem',
          fontWeight: 500,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0, 51, 102, 0.15)',
          },
        },
        contained: {
          background: `linear-gradient(45deg, ${oceanColors.deepBlue} 30%, ${oceanColors.oceanTeal} 90%)`,
          '&:hover': {
            background: `linear-gradient(45deg, ${oceanColors.navyBlue} 30%, ${oceanColors.darkTeal} 90%)`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 51, 102, 0.1)',
          border: `1px solid ${oceanColors.grey[200]}`,
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0, 51, 102, 0.15)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: `linear-gradient(90deg, ${oceanColors.deepBlue} 0%, ${oceanColors.oceanTeal} 100%)`,
          boxShadow: '0 2px 12px rgba(0, 51, 102, 0.15)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(0, 51, 102, 0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: oceanColors.oceanTeal,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: oceanColors.deepBlue,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        filled: {
          backgroundColor: oceanColors.seafoamGreen,
          color: oceanColors.deepBlue,
          '&:hover': {
            backgroundColor: '#7ee3b3',
          },
        },
      },
    },
  },
});

export default oceanTheme;
