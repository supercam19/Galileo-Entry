import type { ReactNode } from 'react';
import { Card, Stack, Typography } from '@mui/material';

interface ChartPanelProps {
  title: string;
  body: string;
  children: ReactNode;
}

const ChartPanel = ({ title, body, children }: ChartPanelProps) => (
  <Card
    variant="outlined"
    sx={{
      p: 3,
      height: '100%',
      borderColor: 'divider',
      bgcolor: 'background.paper',
    }}
  >
    <Stack spacing={2}>
      <Stack spacing={0.5}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {body}
        </Typography>
      </Stack>
      {children}
    </Stack>
  </Card>
);

export default ChartPanel;
