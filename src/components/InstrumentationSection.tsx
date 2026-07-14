import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { useLanguage } from '../i18n/LanguageContext';
import { instrumentSpecs } from '../data/instrumentSpecs';
import type { InstrumentKey } from '../data/instrumentSpecs';
import InstrumentCard from './InstrumentCard';
import { jupiterPalette } from '../theme/theme';

const accents: Record<InstrumentKey, string> = {
  z1: jupiterPalette.rustBright,
  z2: jupiterPalette.ochre,
  lat: jupiterPalette.cyan,
};

const InstrumentationSection = () => {
  const { t } = useLanguage();

  return (
    <Box id="instruments" component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Stack spacing={1.5} sx={{ mb: 6, maxWidth: 640 }}>
          <Typography variant="overline" sx={{ color: 'secondary.main', letterSpacing: '0.2em' }}>
            {t('instruments.eyebrow')}
          </Typography>
          <Typography variant="h3">{t('instruments.title')}</Typography>
          <Typography variant="body1" color="text.secondary">
            {t('instruments.intro')}
          </Typography>
        </Stack>
        <Grid container spacing={3}>
          {instrumentSpecs.map((spec) => (
            <Grid key={spec.key} size={{ xs: 12, md: 4 }}>
              <InstrumentCard
                code={t(`instruments.${spec.key}.code`)}
                name={t(`instruments.${spec.key}.name`)}
                description={t(`instruments.${spec.key}.description`)}
                ranges={spec.ranges}
                rangesLabel={t('instruments.rangesLabel')}
                resolutionLabel={t('instruments.resolutionLabel')}
                accent={accents[spec.key]}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default InstrumentationSection;
