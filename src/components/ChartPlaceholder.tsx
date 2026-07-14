import { Box, Card, Chip, Stack, Typography } from '@mui/material';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';

interface ChartPlaceholderProps {
  title: string;
  body: string;
  status: string;
}

const ChartPlaceholder = ({ title, body, status }: ChartPlaceholderProps) => (
  <Card
    variant="outlined"
    sx={{
      p: 4,
      height: '100%',
      minHeight: 280,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderStyle: 'dashed',
      borderColor: 'divider',
      bgcolor: 'rgba(255,255,255,0.015)',
    }}
  >
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Typography variant="h6">{title}</Typography>
        <Chip
          label={status}
          size="small"
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.65rem',
            bgcolor: 'transparent',
            border: '1px solid',
            borderColor: 'secondary.main',
            color: 'secondary.main',
          }}
        />
      </Stack>
      <Typography variant="body2" color="text.secondary">
        {body}
      </Typography>
    </Stack>
    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4, opacity: 0.35 }}>
      <InsightsRoundedIcon sx={{ fontSize: 56 }} />
    </Box>
  </Card>
);

export default ChartPlaceholder;
