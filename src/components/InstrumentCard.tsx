import { Box, Card, Stack, Typography } from '@mui/material';
import { useLanguage } from '../i18n/LanguageContext';
import type { RangeSpec } from '../data/instrumentSpecs';

interface InstrumentCardProps {
  code: string;
  name: string;
  description: string;
  ranges: RangeSpec[];
  rangesLabel: string;
  resolutionLabel: string;
  accent: string;
}

const formatResolution = (
  value: number,
  formatNumber: (numberValue: number, options?: Intl.NumberFormatOptions) => string,
) => {
  if (Math.abs(value) < 0.001) {
    const [mantissa, exponent] = value.toExponential(1).split('e-');
    return `${formatNumber(Number(mantissa), { maximumFractionDigits: 1 })}\u00d710\u207b${exponent}`;
  }
  return formatNumber(value, { maximumFractionDigits: 4 });
};

const InstrumentCard = ({
  code,
  name,
  description,
  ranges,
  rangesLabel,
  resolutionLabel,
  accent,
}: InstrumentCardProps) => {
  const { formatNumber } = useLanguage();

  return (
    <Card
      variant="outlined"
      sx={{
        p: 3,
        height: '100%',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        transition: 'transform 200ms ease, border-color 200ms ease',
        '&:hover': { transform: 'translateY(-4px)', borderColor: accent },
      }}
    >
      <Stack spacing={2}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Box
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: accent,
              border: '1px solid',
              borderColor: accent,
              borderRadius: 999,
              px: 1.2,
              py: 0.3,
            }}
          >
            {code}
          </Box>
          <Typography variant="h6">{name}</Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Box>
          <Typography
            variant="overline"
            sx={{ color: 'text.secondary', fontSize: '0.62rem', display: 'block', mb: 1 }}
          >
            {rangesLabel}
          </Typography>
          <Stack spacing={0.75}>
            {ranges.map((range, index) => (
              <Stack
                key={index}
                direction="row"
                sx={{
                  justifyContent: 'space-between',
                  borderBottom: '1px dashed',
                  borderColor: 'divider',
                  pb: 0.5,
                }}
              >
                <Typography
                  component="span"
                  sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.primary' }}
                >
                  {`R${index + 1} \u00b7 ${formatNumber(range.min, { maximumFractionDigits: 3 })} \u2192 ${formatNumber(
                    range.max,
                    { maximumFractionDigits: 3 },
                  )}`}
                </Typography>
                <Typography
                  component="span"
                  sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'secondary.main' }}
                >
                  {`${resolutionLabel} ${formatResolution(range.resolution, formatNumber)}`}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
};

export default InstrumentCard;
