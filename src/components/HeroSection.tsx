import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { useLanguage } from '../i18n/LanguageContext';
import TelemetryStat from './TelemetryStat';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <Box id="overview" component="section" sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={3}>
              <Typography
                variant="overline"
                sx={{ color: 'secondary.main', letterSpacing: '0.24em' }}
              >
                {t('hero.eyebrow')}
              </Typography>
              <Typography variant="h1" sx={{ fontSize: { xs: '2.3rem', sm: '3rem', md: '3.6rem' }, lineHeight: 1.08 }}>
                {t('hero.titleLine1')}
                <Box component="span" sx={{ display: 'block', color: 'primary.light' }}>
                  {t('hero.titleLine2')}
                </Box>
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 520, fontSize: '1.05rem' }}>
                {t('hero.body')}
              </Typography>
              <Stack direction="row" spacing={2} useFlexGap sx={{ pt: 1, flexWrap: 'wrap' }}>
                <TelemetryStat label={t('hero.statVelocity')} value="47.4" unit="km/s" />
                <TelemetryStat label={t('hero.statPeakG')} value="228" unit="g" />
                <TelemetryStat label={t('hero.statDuration')} value="58" unit="min" />
              </Stack>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                p: { xs: 3, md: 4 },
                bgcolor: 'rgba(255,255,255,0.015)',
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
              }}
            >
              <video
                  src="output.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  width="320px"
                  height="320px"
              />
              <Typography
                align="center"
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.7rem',
                  color: 'text.secondary',
                  mt: 2,
                }}
              >
                {t('hero.orbCaption')}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
