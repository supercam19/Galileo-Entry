import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { Box, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { descentSamples } from '../../data/descentDataset';
import { jupiterPalette } from '../../theme/theme';

export type AxisKey = 'time' | 'altitude' | 'descentVelocity' | 'pressure' | 'temperature' | 'density' | 'gravity' | 'temperatureGradient';

interface Props {
    xAxisOptions: AxisKey[];
    yAxis: AxisKey;
    suspectNote?: string;
}

const DescentChart = ({ xAxisOptions, yAxis, suspectNote }: Readonly<Props>) => {
    const { t } = useLanguage();
    const [xAxisKey, setXAxisKey] = useState<AxisKey>(xAxisOptions[0] ?? 'time');

    const axisUnits: Record<AxisKey, string> = {
        time: 's',
        altitude: 'km',
        descentVelocity: 'm/s',
        pressure: 'bars',
        temperature: 'K',
        density: 'kg/m^3',
        gravity: 'm/s^2',
        temperatureGradient: 'K/km',
    };

    const chartData = descentSamples.map((sample) => ({
        ...sample,
        altitude: -sample.altitude,
        descentVelocity: -sample.descentVelocity,
    }));

    const formatLabel = (key: AxisKey) => key.charAt(0).toUpperCase() + key.slice(1);

    const formatButtonLabel = (key: AxisKey) => {
        const translatedLabels: Partial<Record<AxisKey, string>> = {
            time: t('charts.timeButton'),
            altitude: t('charts.altitudeButton'),
            descentVelocity: t('charts.descentVelocityButton'),
            pressure: t('charts.pressureButton'),
            temperature: t('charts.temperatureButton'),
            density: t('charts.densityButton'),
            gravity: t('charts.gravityButton'),
            temperatureGradient: t('charts.temperatureGradientButton'),
        };

    return translatedLabels[key] ?? formatLabel(key);
}

    const formatAxisLabel = (key: AxisKey) => {
        const translatedLabels: Partial<Record<AxisKey, string>> = {
            time: t('charts.timeAxis'),
            altitude: t('charts.altitudeAxis'),
            descentVelocity: t('charts.descentVelocityAxis'),
            pressure: t('charts.pressureAxis'),
            temperature: t('charts.temperatureAxis'),
            density: t('charts.densityAxis'),
            gravity: t('charts.gravityAxis'),
            temperatureGradient: t('charts.temperatureGradientAxis'),
        };

        return translatedLabels[key] ?? formatLabel(key);
    };

    return (
        <Stack spacing={2}>
            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
                {xAxisOptions.length > 1 && (
                    <ToggleButtonGroup
                        value={xAxisKey}
                        exclusive
                        onChange={(_, next: AxisKey | null) => next && setXAxisKey(next)}
                        size="small"
                        aria-label="Toggle horizontal axis data key"
                    >
                        {xAxisOptions.map((key) => (
                            <ToggleButton
                                key={key}
                                value={key}
                                sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.7rem', px: 1.4 }}
                            >
                                {formatButtonLabel(key)}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                )}
            </Stack>

            <Box sx={{ width: '100%', height: 280 }}>
                <ResponsiveContainer>
                    <LineChart margin={{ top: 8, right: 12, bottom: 8, left: 0 }} data={chartData}>
                        <CartesianGrid stroke={jupiterPalette.line} strokeDasharray="3 6" />

                        <XAxis
                            dataKey={xAxisKey}
                            type="number"
                            domain={['auto', 'auto']}
                            tick={{ fill: jupiterPalette.cream, fontFamily: 'IBM Plex Mono', fontSize: 11 }}
                            stroke={jupiterPalette.line}
                            label={{
                                value: formatAxisLabel(xAxisKey),
                                position: 'insideBottom',
                                offset: -4,
                                fill: jupiterPalette.cream,
                                fontSize: 11
                            }}
                        />

                        <YAxis
                            scale="linear"
                            domain={['auto', 'auto']}
                            allowDataOverflow
                            tick={{ fill: jupiterPalette.cream, fontFamily: 'IBM Plex Mono', fontSize: 11 }}
                            stroke={jupiterPalette.line}
                            width={64}
                            label={{
                                value: formatAxisLabel(yAxis),
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
                            formatter={(value) => (value === undefined ? '' : Number(value).toFixed(3))}
                            labelFormatter={(label) => {
                                const val = typeof label === 'number' ? Number(label).toFixed(3) : String(label ?? '');
                                return `${formatLabel(xAxisKey)} = ${val} ${axisUnits[xAxisKey]}`;
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey={yAxis}
                            name={formatLabel(yAxis)}
                            stroke={jupiterPalette.rustBright}
                            strokeWidth={2}
                            dot={false}
                            connectNulls
                            isAnimationActive={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Box>

            {suspectNote && <Typography variant="caption" color="text.secondary">
                {suspectNote}
            </Typography>}
        </Stack>
    );
};

export default DescentChart;