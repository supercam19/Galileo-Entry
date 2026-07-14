import { Box, Card, Container, Stack, Typography } from '@mui/material';
import { useLanguage } from '../i18n/LanguageContext';
import TelemetryStat from './TelemetryStat';
import { jupiterPalette } from '../theme/theme';

const descentDepthKm = 160;
const depthSharePercent = 0.22;
const finalPressureBar = 24;

const stages = [
  { key: 'deploy', velocity: 400, accent: jupiterPalette.rustBright },
  { key: 'plus100s', velocity: 156, accent: jupiterPalette.rust },
  { key: 'threeBar', velocity: 48, accent: jupiterPalette.ochre },
  { key: 'lossOfSignal', velocity: 30, accent: jupiterPalette.cyan },
] as const;

const viewBoxWidth = 420;
const viewBoxHeight = 260;

const globeCx = 70;
const globeCy = 140;
const globeR = 55;

const markerAngleRad = 0;
const markerX = globeCx + globeR * Math.sin(markerAngleRad);
const markerY = globeCy - globeR * Math.cos(markerAngleRad);
const markerHalfSize = 7;

const zoomBoxX = 190;
const zoomBoxY = 20;
const zoomBoxW = 210;
const zoomBoxH = 220;

const magnification = Math.round(zoomBoxW / (markerHalfSize * 2));

const labelAreaHeight = 36;
const edgeY = zoomBoxY + labelAreaHeight;

const probeCircleX = zoomBoxX + zoomBoxW / 2;
const probeCircleY = zoomBoxY + (zoomBoxH * 2) / 3;
const probeCircleR = 7;

const bracketTick = 8;
const bracketGap = 8;
const bracketX = probeCircleX - probeCircleR - bracketGap - bracketTick;

const DepthZoomVisual = () => {
  const { t, formatNumber } = useLanguage();

  return (
    <Box sx={{ width: '100%', maxWidth: 420, mx: 'auto' }}>
      <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} width="100%" height="auto" role="img" aria-hidden="true">
        <defs>
          <clipPath id="depthGlobeClip">
            <circle cx={globeCx} cy={globeCy} r={globeR} />
          </clipPath>
          <radialGradient id="depthGlobeShade" cx="35%" cy="28%" r="78%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
          </radialGradient>
          <linearGradient id="atmosphereShade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
          </linearGradient>
        </defs>

        <g clipPath="url(#depthGlobeClip)">
          <rect x={globeCx - globeR} y={globeCy - globeR} width={globeR * 2} height={globeR * 0.5} fill={jupiterPalette.cream} />
          <rect x={globeCx - globeR} y={globeCy - globeR * 0.5} width={globeR * 2} height={globeR * 0.5} fill={jupiterPalette.ochre} />
          <rect x={globeCx - globeR} y={globeCy} width={globeR * 2} height={globeR * 0.5} fill={jupiterPalette.rust} />
          <rect x={globeCx - globeR} y={globeCy + globeR * 0.5} width={globeR * 2} height={globeR * 0.5} fill={jupiterPalette.rustDark} />
        </g>
        <circle cx={globeCx} cy={globeCy} r={globeR} fill="url(#depthGlobeShade)" />

        <line
          x1={markerX + markerHalfSize}
          y1={markerY - markerHalfSize}
          x2={zoomBoxX}
          y2={zoomBoxY}
          stroke={jupiterPalette.cyan}
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.7"
        />
        <line
          x1={markerX + markerHalfSize}
          y1={markerY + markerHalfSize}
          x2={zoomBoxX}
          y2={zoomBoxY + zoomBoxH}
          stroke={jupiterPalette.cyan}
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.7"
        />
        <rect
          x={markerX - markerHalfSize}
          y={markerY - markerHalfSize}
          width={markerHalfSize * 2}
          height={markerHalfSize * 2}
          fill="none"
          stroke={jupiterPalette.cyan}
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />
        <circle cx={markerX} cy={markerY} r={2} fill={jupiterPalette.cyan} />

          <path d={`
                M ${zoomBoxX} ${edgeY}
                H ${zoomBoxX + zoomBoxW}
                V ${edgeY + zoomBoxH - labelAreaHeight - 10}
                Q ${zoomBoxX + zoomBoxW} ${edgeY + zoomBoxH - labelAreaHeight}
                  ${zoomBoxX + zoomBoxW - 10} ${edgeY + zoomBoxH - labelAreaHeight}
                H ${zoomBoxX + 10}
                Q ${zoomBoxX} ${edgeY + zoomBoxH - labelAreaHeight}
                  ${zoomBoxX} ${edgeY + zoomBoxH - labelAreaHeight - 10}
                Z
              `}
            fill={jupiterPalette.cream}
          />
        <rect x={zoomBoxX} y={edgeY} width={zoomBoxW} height={zoomBoxH - labelAreaHeight} fill="url(#atmosphereShade)" />
        <rect
          x={zoomBoxX}
          y={zoomBoxY}
          width={zoomBoxW}
          height={zoomBoxH}
          rx={10}
          fill="none"
          stroke={jupiterPalette.line}
          strokeWidth="1"
        />
        <line x1={zoomBoxX} y1={edgeY} x2={zoomBoxX + zoomBoxW} y2={edgeY} stroke={jupiterPalette.cyan} strokeWidth="7" opacity="0.3" />
        <line x1={zoomBoxX} y1={edgeY} x2={zoomBoxX + zoomBoxW} y2={edgeY} stroke={jupiterPalette.cyan} strokeWidth="1.5" opacity="0.9" />
        <text
          x={zoomBoxX + zoomBoxW / 2}
          y={zoomBoxY + 22}
          textAnchor="middle"
          fill={jupiterPalette.cream}
          opacity="0.85"
          fontFamily="IBM Plex Mono"
          fontSize="11"
        >
          {t('descent.magnificationLabel').replace('{value}', String(magnification))}
        </text>

        <path
          d={`M${bracketX + bracketTick},${edgeY} L${bracketX},${edgeY} L${bracketX},${probeCircleY} L${
            bracketX + bracketTick
          },${probeCircleY}`}
          fill="none"
          stroke={jupiterPalette.void}
          strokeWidth="2"
        />
        <text
          x={bracketX - 10}
          y={(edgeY + probeCircleY) / 2 + 4}
          textAnchor="end"
          fill={jupiterPalette.void}
          stroke={jupiterPalette.cream}
          strokeWidth="3"
          paintOrder="stroke"
          fontFamily="IBM Plex Mono"
          fontWeight="600"
          fontSize="13"
        >
          {`${formatNumber(descentDepthKm)} km`}
        </text>

        <circle
          cx={probeCircleX}
          cy={probeCircleY}
          r={probeCircleR}
          fill={jupiterPalette.cyan}
          stroke={jupiterPalette.void}
          strokeWidth="2"
        />
        <text
          x={probeCircleX + probeCircleR + 10}
          y={probeCircleY + 4}
          fill={jupiterPalette.void}
          stroke={jupiterPalette.cream}
          strokeWidth="3"
          paintOrder="stroke"
          fontFamily="IBM Plex Sans"
          fontWeight="600"
          fontSize="12"
        >
          {t('descent.lossOfSignalShort')}
        </text>
      </svg>
    </Box>
  );
};

const DescentDepthChart = () => {
  const { t, formatNumber } = useLanguage();

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Card variant="outlined" sx={{ p: 3, bgcolor: 'background.paper', borderColor: 'divider' }}>
          <Stack spacing={3}>
            <Stack spacing={0.5}>
              <Typography variant="overline" sx={{ color: 'secondary.main', letterSpacing: '0.2em' }}>
                {t('descent.eyebrow')}
              </Typography>
              <Typography variant="h6">{t('descent.title')}</Typography>
              <Typography variant="body2" color="text.secondary">
                {t('descent.intro')}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
              <TelemetryStat label={t('descent.statDepth')} value={formatNumber(descentDepthKm)} unit="km" />
              <TelemetryStat
                label={t('descent.statShare')}
                value={formatNumber(depthSharePercent, { maximumFractionDigits: 2 })}
                unit="%"
              />
              <TelemetryStat label={t('descent.statPressure')} value={formatNumber(finalPressureBar)} unit="bar" />
            </Stack>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
              <Stack spacing={0} sx={{ flex: 1, position: 'relative', pl: 2 }}>
                <Box
                  sx={{
                    position: 'absolute',
                    left: 7,
                    top: 10,
                    bottom: 10,
                    width: '1px',
                    bgcolor: 'divider',
                  }}
                />
                {stages.map((stage) => (
                  <Stack key={stage.key} direction="row" spacing={2} sx={{ alignItems: 'center', py: 1.4 }}>
                    <Box
                      sx={{
                        position: 'relative',
                        left: -9,
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: 'background.paper',
                        border: '2px solid',
                        borderColor: stage.accent,
                        flexShrink: 0,
                      }}
                    />
                    <Stack spacing={0.2} sx={{ ml: -1 }}>
                      <Typography
                        sx={{
                          fontFamily: '"IBM Plex Mono", monospace',
                          fontSize: '0.95rem',
                          fontWeight: 600,
                          color: stage.accent,
                        }}
                      >
                        {`${formatNumber(stage.velocity)} m/s`}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {t(`descent.${stage.key}`)}
                      </Typography>
                    </Stack>
                  </Stack>
                ))}
              </Stack>

              <Stack spacing={1} sx={{ flex: 1, alignItems: 'center' }}>
                <Typography variant="overline" sx={{ color: 'text.secondary', fontSize: '0.62rem' }}>
                  {t('descent.scaleLabel')}
                </Typography>
                <DepthZoomVisual />
                <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', maxWidth: 320 }}>
                  {t('descent.scaleCaption')}
                </Typography>
              </Stack>
            </Box>

            <Typography variant="caption" color="text.secondary">
              {t('descent.footnote')}
            </Typography>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
};

export default DescentDepthChart;
