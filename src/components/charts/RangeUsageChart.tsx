import { useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Box, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useLanguage } from '../../i18n/LanguageContext';
import { z1Samples, z2Samples, latSamples } from '../../data/accelDatasets';
import { computeRangeCounts } from '../../data/rangeUsage';
import { instrumentSpecs } from '../../data/instrumentSpecs';
import { jupiterPalette } from '../../theme/theme';

type Channel = 'z1' | 'z2' | 'lat';
type Mode = 'count' | 'share';

const specByKey = Object.fromEntries(instrumentSpecs.map((spec) => [spec.key, spec.ranges]));

const RangeUsageChart = () => {
  const { t } = useLanguage();
  const [channels, setChannels] = useState<Channel[]>(['z1', 'z2', 'lat']);
  const [mode, setMode] = useState<Mode>('share');

  const rows = useMemo(() => {
    const z1Counts = computeRangeCounts(z1Samples, specByKey.z1);
    const z2Counts = computeRangeCounts(z2Samples, specByKey.z2);
    const latCounts = computeRangeCounts(latSamples, specByKey.lat);
    const rangeCount = Math.max(z1Counts.length, z2Counts.length, latCounts.length);

    const toValue = (counts: number[], index: number, total: number) => {
      if (index >= counts.length) {
        return undefined;
      }
      return mode === 'share' ? Number(((counts[index] / total) * 100).toFixed(1)) : counts[index];
    };

    return Array.from({ length: rangeCount }, (_, index) => ({
      rangeLabel: `R${index + 1}`,
      z1: toValue(z1Counts, index, z1Samples.length),
      z2: toValue(z2Counts, index, z2Samples.length),
      lat: toValue(latCounts, index, latSamples.length),
    }));
  }, [mode]);

  const channelMeta: Record<Channel, { label: string; color: string }> = {
    z1: { label: t('instruments.z1.code'), color: jupiterPalette.rustBright },
    z2: { label: t('instruments.z2.code'), color: jupiterPalette.ochre },
    lat: { label: t('instruments.lat.code'), color: jupiterPalette.cyan },
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <ToggleButtonGroup
          value={channels}
          onChange={(_, next: Channel[]) => next.length > 0 && setChannels(next)}
          size="small"
          aria-label="Toggle visible sensor channels"
        >
          {(Object.keys(channelMeta) as Channel[]).map((key) => (
            <ToggleButton key={key} value={key} sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.7rem', px: 1.4 }}>
              {channelMeta[key].label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_, next: Mode | null) => next && setMode(next)}
          size="small"
          aria-label="Toggle count or share display"
        >
          <ToggleButton value="count" sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.7rem', px: 1.4 }}>
            {t('charts.countMode')}
          </ToggleButton>
          <ToggleButton value="share" sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.7rem', px: 1.4 }}>
            {t('charts.shareMode')}
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Box sx={{ width: '100%', height: 320 }}>
        <ResponsiveContainer>
          <BarChart data={rows} margin={{ top: 8, right: 12, bottom: 8, left: 0 }}>
            <CartesianGrid stroke={jupiterPalette.line} strokeDasharray="3 6" />
            <XAxis
              dataKey="rangeLabel"
              tick={{ fill: jupiterPalette.cream, fontFamily: 'IBM Plex Mono', fontSize: 11 }}
              stroke={jupiterPalette.line}
              label={{ value: t('charts.rangeAxis'), position: 'insideBottom', offset: -4, fill: jupiterPalette.cream, fontSize: 11 }}
            />
            <YAxis
              tick={{ fill: jupiterPalette.cream, fontFamily: 'IBM Plex Mono', fontSize: 11 }}
              stroke={jupiterPalette.line}
              width={48}
              unit={mode === 'share' ? '%' : ''}
            />
            <Tooltip
              contentStyle={{
                background: jupiterPalette.dusk,
                border: `1px solid ${jupiterPalette.line}`,
                borderRadius: 8,
                fontFamily: 'IBM Plex Mono',
                fontSize: 12,
              }}
              formatter={(value) => (value === undefined ? '' : mode === 'share' ? `${value}%` : value)}
            />
            <Legend wrapperStyle={{ fontFamily: 'IBM Plex Mono', fontSize: 11, bottom: 0}} />
            {channels.includes('z1') && <Bar dataKey="z1" name={channelMeta.z1.label} fill={channelMeta.z1.color} radius={[4, 4, 0, 0]} />}
            {channels.includes('z2') && <Bar dataKey="z2" name={channelMeta.z2.label} fill={channelMeta.z2.color} radius={[4, 4, 0, 0]} />}
            {channels.includes('lat') && <Bar dataKey="lat" name={channelMeta.lat.label} fill={channelMeta.lat.color} radius={[4, 4, 0, 0]} />}
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Stack>
  );
};

export default RangeUsageChart;
