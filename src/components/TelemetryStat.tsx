import { Box, Typography } from '@mui/material';

interface TelemetryStatProps {
  label: string;
  value: string;
  unit: string;
}

const TelemetryStat = ({ label, value, unit }: TelemetryStatProps) => (
  <Box
    sx={{
      px: 2,
      py: 1.5,
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'divider',
      bgcolor: 'rgba(255,255,255,0.02)',
      minWidth: 130,
    }}
  >
    <Typography
      variant="overline"
      sx={{ color: 'text.secondary', fontSize: '0.62rem', display: 'block', mb: 0.5, letterSpacing: '0.14em' }}
    >
      {label}
    </Typography>
    <Typography
      sx={{
        fontFamily: '"IBM Plex Mono", monospace',
        fontSize: '1.4rem',
        fontWeight: 600,
        color: 'secondary.main',
        lineHeight: 1,
      }}
    >
      {value}
      <Typography
        component="span"
        sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.85rem', color: 'text.secondary', ml: 0.5 }}
      >
        {unit}
      </Typography>
    </Typography>
  </Box>
);

export default TelemetryStat;
