import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { useLanguage } from '../i18n/LanguageContext';
import ChartPanel from './ChartPanel';
import DecelerationChart from './DecelerationChart';
import RangeUsageChart from './RangeUsageChart';

const ChartsSection = () => {
  const { t } = useLanguage();

  return (
    <Box id="charts" component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Stack spacing={1.5} sx={{ mb: 6, maxWidth: 640 }}>
          <Typography variant="overline" sx={{ color: 'secondary.main', letterSpacing: '0.2em' }}>
            {t('charts.eyebrow')}
          </Typography>
          <Typography variant="h3">{t('charts.title')}</Typography>
        </Stack>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <ChartPanel title={t('charts.chart1Title')} body={t('charts.chart1Body')}>
              <DecelerationChart />
            </ChartPanel>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ChartPanel title={t('charts.chart2Title')} body={t('charts.chart2Body')}>
              <RangeUsageChart />
            </ChartPanel>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ChartsSection;
