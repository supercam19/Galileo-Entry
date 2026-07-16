import { Box } from '@mui/material';
import type { ReactNode } from 'react';

interface PageShellProps {
  children: ReactNode;
}

const PageShell = ({ children }: PageShellProps) => (
  <Box
    sx={{
      width: '100%',
      mx: 'auto',
      maxWidth: 1800,
      px: { xs: 2, sm: 3, md: 5, lg: 8 },
    }}
  >
    {children}
  </Box>
);

export default PageShell;
