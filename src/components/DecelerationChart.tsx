import { useMemo, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Box, FormControlLabel, Stack, Switch, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useLanguage } from '../i18n/LanguageContext';
import { z1Samples, z2Samples } from '../data/accelDatasets';
import { isSuspectTime } from '../data/suspectSamples';
import { jupiterPalette } from '../theme/theme';

type ScaleMode = 'linear' | 'log';
type SeriesKey = 'z1' | 'z2';

const DecelerationChart = () => {
  const { t, formatNumber } = useLanguage();
  const [visibleSeries, setVisibleSeries] = useState<SeriesKey[]>(['z1', 'z2']);
  const [scaleMode, setScaleMode] = useState<ScaleMode>('log');
  const [hideFlagged, setHideFlagged] = useState(false);

  const z1Data = useMemo(
    () => z1Samples.filter((sample) => !hideFlagged || !isSuspectTime('z1', sample.time)),
    [hideFlagged],
  );
  const z2Data = useMemo(
    () => z2Samples.filter((sample) => !hideFlagged || !isSuspectTime('z2', sample.time)),
    [hideFlagged],
  );

  const renderDot = (channel: SeriesKey, color: string) => (props: { cx?: number; cy?: number; payload?: { time: number } }) => {
    const { cx, cy, payload } = props;
    if (!payload || cx === undefined || cy === undefined || !isSuspectTime(channel, payload.time)) {
      return <g />;
    }
    return <circle cx={cx} cy={cy} r={4} fill={jupiterPalette.void} stroke={color} strokeWidth={2} />;
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <ToggleButtonGroup
          value={visibleSeries}
          onChange={(_, next: SeriesKey[]) => next.length > 0 && setVisibleSeries(next)}
          size="small"
          aria-label="Toggle visible sensor channels"
        >
          <ToggleButton value="z1" sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.7rem', px: 1.4 }}>
            {t('instruments.z1.code')}
          </ToggleButton>
          <ToggleButton value="z2" sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.7rem', px: 1.4 }}>
            {t('instruments.z2.code')}
          </ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          value={scaleMode}
          exclusive
          onChange={(_, next: ScaleMode | null) => next && setScaleMode(next)}
          size="small"
          aria-label="Toggle vertical axis scale"
        >
          <ToggleButton value="linear" sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.7rem', px: 1.4 }}>
            {t('charts.scaleLinear')}
          </ToggleButton>
          <ToggleButton value="log" sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.7rem', px: 1.4 }}>
            {t('charts.scaleLog')}
          </ToggleButton>
        </ToggleButtonGroup>
        <FormControlLabel
          control={<Switch size="small" checked={hideFlagged} onChange={(_, checked) => setHideFlagged(checked)} />}
          label={
            <Typography variant="caption" color="text.secondary">
              {t('charts.hideFlagged')}
            </Typography>
          }
        />
      </Stack>
      <Box sx={{ width: '100%', height: 280 }}>
        <ResponsiveContainer>
          <LineChart margin={{ top: 8, right: 12, bottom: 8, left: 0 }}>
            <CartesianGrid stroke={jupiterPalette.line} strokeDasharray="3 6" />
            <XAxis
              dataKey="time"
              type="number"
              domain={['dataMin', 'dataMax']}
              tick={{ fill: jupiterPalette.cream, fontFamily: 'IBM Plex Mono', fontSize: 11 }}
              stroke={jupiterPalette.line}
              label={{ value: t('charts.timeAxis'), position: 'insideBottom', offset: -4, fill: jupiterPalette.cream, fontSize: 11 }}
            />
            <YAxis
              scale={scaleMode === 'log' ? 'log' : 'linear'}
              domain={scaleMode === 'log' ? [0.0001, 'dataMax'] : [0, 'dataMax']}
              allowDataOverflow
              tick={{ fill: jupiterPalette.cream, fontFamily: 'IBM Plex Mono', fontSize: 11 }}
              stroke={jupiterPalette.line}
              width={64}
              label={{
                value: t('charts.accelAxis'),
                angle: -90,
                position: 'insideLeft',
                fill: jupiterPalette.cream,
                fontSize: 11,
              }}
            />
            <Tooltip
              contentStyle={{
                background: jupiterPalette.dusk,
                border: `1px solid ${jupiterPalette.line}`,
                borderRadius: 8,
                fontFamily: 'IBM Plex Mono',
                fontSize: 12,
              }}
              formatter={(value) => (value === undefined ? '' : formatNumber(Number(value), { maximumFractionDigits: 3 }))}
              labelFormatter={(label) =>
                typeof label === 'number' ? `t = ${formatNumber(label, { maximumFractionDigits: 3 })} s` : String(label ?? '')
              }
            />
            {visibleSeries.includes('z1') && (
              <Line
                data={z1Data}
                dataKey="value"
                name={t('instruments.z1.code')}
                stroke={jupiterPalette.rustBright}
                strokeWidth={2}
                dot={renderDot('z1', jupiterPalette.rustBright)}
                isAnimationActive={false}
              />
            )}
            {visibleSeries.includes('z2') && (
              <Line
                data={z2Data}
                dataKey="value"
                name={t('instruments.z2.code')}
                stroke={jupiterPalette.cyan}
                strokeWidth={2}
                dot={renderDot('z2', jupiterPalette.cyan)}
                isAnimationActive={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <Typography variant="caption" color="text.secondary">
        {t('charts.suspectNote')}
      </Typography>
    </Stack>
  );
};

export default DecelerationChart;
