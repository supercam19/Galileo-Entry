import { useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import {Box, Stack, ToggleButton, ToggleButtonGroup, Typography} from '@mui/material';
import { useLanguage } from '../../i18n/LanguageContext';
import { ratioEntries } from '../../data/ratiosDataset';
import { jupiterPalette } from '../../theme/theme';

type MetricKey = 'mixing' | 'moleFraction' | 'ratioToSolar';

const safeNum = (val: string | number | null): number | null => {
    if (val === null) return null;
    const num = typeof val === 'string' ? parseFloat(val) : val;
    return isNaN(num) ? null : num;
};

const CompositionChart = () => {
    const { t } = useLanguage();
    const [visibleMetrics, setVisibleMetrics] = useState<MetricKey[]>(['mixing', 'moleFraction', 'ratioToSolar']);

    const rows = useMemo(() => {
        return ratioEntries.map((entry) => ({
            speciesOrRatio: entry.speciesOrRatio,
            mixing: safeNum(entry.mixingRatioOrIsotopeRatio),
            moleFraction: safeNum(entry.moleFraction),
            ratioToSolar: safeNum(entry.ratioToSolar),
        }));
    }, []);

    const metricMeta: Record<MetricKey, { label: string; color: string }> = {
        mixing: { label: t('data.metricMixingRatio'), color: jupiterPalette.rustBright },
        moleFraction: { label: t('data.metricMoleFraction'), color: jupiterPalette.ochre },
        ratioToSolar: { label: t('data.metricRatioToSolar'), color: jupiterPalette.cyan },
    };

    return (
        <Stack spacing={2}>
            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <ToggleButtonGroup
                    value={visibleMetrics}
                    onChange={(_, next) => next && next.length > 0 && setVisibleMetrics(next)}
                    size="small"
                    aria-label="Toggle composition metrics"
                >
                    {(Object.keys(metricMeta) as MetricKey[]).map((key) => (
                        <ToggleButton key={key} value={key} sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.7rem', px: 1.4 }}>
                            {metricMeta[key].label}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </Stack>
            <Box sx={{ width: '100%', height: 320 }}>
                <ResponsiveContainer>
                    <BarChart data={rows} margin={{ top: 8, right: 12, bottom: 8, left: 0 }}>
                        <CartesianGrid stroke={jupiterPalette.line} strokeDasharray="3 6" />
                        <XAxis
                            dataKey="speciesOrRatio"
                            tick={{ fill: jupiterPalette.cream, fontFamily: 'IBM Plex Mono', fontSize: 11 }}
                            stroke={jupiterPalette.line}
                            label={{ value: t('charts.axisSpecies'), position: 'insideBottom', offset: -4, fill: jupiterPalette.cream, fontSize: 11 }}
                        />
                        <YAxis
                            tick={{ fill: jupiterPalette.cream, fontFamily: 'IBM Plex Mono', fontSize: 11 }}
                            stroke={jupiterPalette.line}
                            width={48}
                            unit=""
                        />
                        <Tooltip
                            contentStyle={{
                                background: jupiterPalette.dusk,
                                border: `1px solid ${jupiterPalette.line}`,
                                borderRadius: 8,
                                fontFamily: 'IBM Plex Mono',
                                fontSize: 12,
                            }}
                            formatter={(value) => {
                                const num = typeof value === 'number' ? value : parseFloat(String(value));
                                return [isNaN(num) ? '-' : Number(num).toFixed(4), ''];
                            }}
                        />
                        <Legend wrapperStyle={{ fontFamily: 'IBM Plex Mono', fontSize: 11, bottom: 0 }} />
                        {visibleMetrics.includes('mixing') && (
                            <Bar dataKey="mixing" name={metricMeta.mixing.label} fill={metricMeta.mixing.color} radius={[4, 4, 0, 0]} />
                        )}
                        {visibleMetrics.includes('moleFraction') && (
                            <Bar dataKey="moleFraction" name={metricMeta.moleFraction.label} fill={metricMeta.moleFraction.color} radius={[4, 4, 0, 0]} />
                        )}
                        {visibleMetrics.includes('ratioToSolar') && (
                            <Bar dataKey="ratioToSolar" name={metricMeta.ratioToSolar.label} fill={metricMeta.ratioToSolar.color} radius={[4, 4, 0, 0]} />
                        )}
                    </BarChart>
                </ResponsiveContainer>
                <Typography variant="caption" color="text.secondary">
                    {t('charts.compositionSuspect')}
                </Typography>
            </Box>
        </Stack>
    );
};

export default CompositionChart;
