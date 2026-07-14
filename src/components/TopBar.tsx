import { AppBar, Box, Button, Stack, Toolbar, Typography } from '@mui/material';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageToggle from './LanguageToggle';

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const TopBar = () => {
  const { t } = useLanguage();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'rgba(10, 13, 20, 0.72)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ py: 1.5, gap: { xs: 2, md: 3 }, flexWrap: 'wrap' }}>
        <Stack spacing={0}>
          <Typography sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, fontSize: '0.95rem' }}>
            {t('topbar.mission')}
          </Typography>
          <Typography
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.65rem',
              color: 'text.secondary',
              letterSpacing: '0.08em',
            }}
          >
            {`${t('topbar.tagline')} \u00b7 07.12.1995 \u00b7 22:04 UTC`}
          </Typography>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={0.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button onClick={() => scrollToSection('overview')} sx={{ color: 'text.secondary' }}>
            {t('nav.overview')}
          </Button>
          <Button onClick={() => scrollToSection('instruments')} sx={{ color: 'text.secondary' }}>
            {t('nav.instruments')}
          </Button>
          <Button onClick={() => scrollToSection('charts')} sx={{ color: 'text.secondary' }}>
            {t('nav.charts')}
          </Button>
            <Button onClick={() => scrollToSection('descent')} sx={{color: 'text.secondary' }}>
                {t('nav.descent')}
            </Button>
        </Stack>
        <LanguageToggle />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
