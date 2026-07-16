import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { useLanguage } from '../i18n/LanguageContext';
import ChartPanel from './ChartPanel';
import DecelerationChart from './charts/DecelerationChart';
import DescentChart from "./charts/DescentChart";
import CompositionChart from "./charts/CompositionChart";

const ChartsSection = () => {
  const { t } = useLanguage();

  const charts = {
    deceleration: {
      title: t('charts.chart1Title'),
      body: t('charts.chart1Body'),
      render: () => <DecelerationChart />,
      gridSize: { xs: 12, md: 6, xl: 4 },
    },
    composition: {
      title: t('charts.chart2Title'),
      body: t('charts.chart2Body'),
      render: () => <CompositionChart />,
      gridSize: { xs: 12, md: 6, xl: 4 },
    },
    temperature: {
      title: t('charts.chart3Title'),
      body: t('charts.chart3Body'),
      render: () => <DescentChart xAxisOptions={['time', 'altitude']} yAxis="temperature" />,
      gridSize: { xs: 12, md: 6, xl: 4 },
    },
    pressure: {
      title: t('charts.chart4Title'),
      body: t('charts.chart4Body'),
      render: () => <DescentChart xAxisOptions={['time', 'altitude']} yAxis="pressure" />,
      gridSize: { xs: 12, md: 6, xl: 4 },
    },
    velocity: {
      title: t('charts.chart5Title'),
      body: t('charts.chart5Body'),
      render: () => <DescentChart xAxisOptions={['time', 'altitude']} yAxis="descentVelocity" suspectNote={t('charts.suspect5')}/>,
      gridSize: { xs: 12, md: 6, xl: 4 },
    },
    altitude: {
      title: t('charts.chart6Title'),
      body: t('charts.chart6Body'),
      render: () => <DescentChart xAxisOptions={['time']} yAxis="altitude" />,
      gridSize: { xs: 12, md: 6, xl: 4 },
    }
  };

  return (
    <Box id="charts" component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth={false}>
        <Stack spacing={1.5} sx={{ mb: 6, maxWidth: 640 }}>
          <Typography variant="overline" sx={{ color: 'secondary.main', letterSpacing: '0.2em' }}>
            {t('charts.eyebrow')}
          </Typography>
          <Typography variant="h3">{t('charts.title')}</Typography>
        </Stack>
        <Grid container spacing={3}>
          {Object.values(charts).map(({ title, body, render, gridSize }) => (
            <Grid key={title} size={gridSize}>
              <ChartPanel title={title} body={body}>
                {render()}
              </ChartPanel>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ChartsSection;
