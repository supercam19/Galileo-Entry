import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme/theme';
import { LanguageProvider } from './i18n/LanguageContext';
import Dashboard from './pages/Dashboard';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <LanguageProvider>
      <Dashboard />
    </LanguageProvider>
  </ThemeProvider>
);

export default App;
