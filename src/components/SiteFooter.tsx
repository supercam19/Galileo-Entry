import { Box, Container, Stack, Typography } from '@mui/material';
import { useLanguage } from '../i18n/LanguageContext';

const SiteFooter = () => {
  const { t } = useLanguage();

  return (
    <Box component="footer" sx={{ borderTop: '1px solid', borderColor: 'divider', py: 5 }}>
      <Container maxWidth="lg">
        <Stack spacing={1.5} sx={{ maxWidth: 640 }}>
          <Typography variant="caption" color="text.secondary">
            {t('footer.citation')}
          </Typography>
          <Typography
            variant="caption"
            sx={{ fontFamily: '"IBM Plex Mono", monospace', color: 'text.secondary' }}
          >
            {t('footer.credit')}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default SiteFooter;
