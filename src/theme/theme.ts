import { createTheme } from '@mui/material/styles';

export const jupiterPalette = {
  void: '#0A0D14',
  dusk: '#141A24',
  duskLight: '#1C2430',
  cream: '#E9D9B7',
  ochre: '#C99A52',
  ochreLight: '#DEC58E',
  rust: '#B4552F',
  rustDark: '#8B4225',
  rustBright: '#D9713F',
  cyan: '#6FE3D6',
  line: 'rgba(233, 217, 183, 0.12)',
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: jupiterPalette.rust,
      light: jupiterPalette.rustBright,
      dark: jupiterPalette.rustDark,
      contrastText: jupiterPalette.void,
    },
    secondary: {
      main: jupiterPalette.cyan,
      contrastText: jupiterPalette.void,
    },
    background: {
      default: jupiterPalette.void,
      paper: jupiterPalette.dusk,
    },
    text: {
      primary: jupiterPalette.cream,
      secondary: 'rgba(233, 217, 183, 0.66)',
    },
    divider: jupiterPalette.line,
  },
  typography: {
    fontFamily: '"IBM Plex Sans", sans-serif',
    h1: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, letterSpacing: '-0.02em' },
    h2: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, letterSpacing: '-0.015em' },
    h3: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, letterSpacing: '-0.01em' },
    h4: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
    overline: { fontFamily: '"IBM Plex Mono", monospace', letterSpacing: '0.18em', fontWeight: 500 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiButton: { styleOverrides: { root: { borderRadius: 999 } } },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollBehavior: 'smooth',
        },
      },
    },
  },
});

export default theme;
