import { Box } from '@mui/material';
import { jupiterPalette } from '../theme/theme';

const bandWeights = [0.6, 0.9, 1.1, 0.75, 1.3, 0.85, 1.0, 0.6];
const bandColors = [
  jupiterPalette.cream,
  jupiterPalette.ochre,
  jupiterPalette.ochreLight,
  jupiterPalette.rust,
  jupiterPalette.cream,
  jupiterPalette.rustDark,
  jupiterPalette.ochre,
  jupiterPalette.cream,
];

const orbTop = 50;
const orbSpan = 300;
const totalWeight = bandWeights.reduce((sum, w) => sum + w, 0);

const buildBands = () => {
  let cursor = orbTop;
  return bandWeights.map((weight, index) => {
    const height = (weight / totalWeight) * orbSpan;
    const band = { y: cursor, height, color: bandColors[index] };
    cursor += height;
    return band;
  });
};

const bands = buildBands();
const redSpotBand = bands[5];

const JupiterOrb = () => (
  <Box
    sx={{
      position: 'relative',
      width: { xs: 240, sm: 300, md: 340 },
      height: { xs: 240, sm: 300, md: 340 },
      mx: 'auto',
    }}
  >
    <Box
      sx={{
        position: 'absolute',
        inset: '-16%',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${jupiterPalette.rust}33 0%, transparent 65%)`,
        filter: 'blur(20px)',
      }}
    />
    <svg viewBox="0 0 400 400" width="100%" height="100%" role="img" aria-labelledby="jupiterOrbTitle">
      <title id="jupiterOrbTitle">Illustration of Jupiter with the Galileo probe entry trajectory</title>
      <style>
        {`
          @keyframes jupiterSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          .jupiter-bands { animation: jupiterSpin 160s linear infinite; transform-origin: 200px 200px; }
          @media (prefers-reduced-motion: reduce) { .jupiter-bands { animation: none; } }
        `}
      </style>
      <defs>
        <clipPath id="orbClip">
          <circle cx="200" cy="200" r="150" />
        </clipPath>
        <radialGradient id="orbShade" cx="35%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.38" />
        </radialGradient>
      </defs>
      <circle
        cx="200"
        cy="200"
        r="168"
        fill="none"
        stroke={jupiterPalette.cyan}
        strokeOpacity="0.32"
        strokeDasharray="2 8"
      />
      <g className="jupiter-bands" clipPath="url(#orbClip)">
        {bands.map((band, index) => (
          <rect key={index} x="0" y={band.y} width="400" height={band.height + 1} fill={band.color} />
        ))}
        <ellipse
          cx="250"
          cy={redSpotBand.y + redSpotBand.height / 2}
          rx="44"
          ry={Math.min(18, redSpotBand.height / 2)}
          fill={jupiterPalette.rustBright}
          opacity="0.92"
        />
        <ellipse
          cx="250"
          cy={redSpotBand.y + redSpotBand.height / 2}
          rx="44"
          ry={Math.min(18, redSpotBand.height / 2)}
          fill="none"
          stroke={jupiterPalette.rustDark}
          strokeOpacity="0.5"
          strokeWidth="2"
        />
      </g>
      <circle cx="200" cy="200" r="150" fill="url(#orbShade)" />
      <g>
        <path
          d="M 36 44 C 100 70, 148 108, 176 162"
          fill="none"
          stroke={jupiterPalette.cyan}
          strokeWidth="1.5"
          strokeDasharray="5 5"
          opacity="0.85"
        />
        <circle cx="36" cy="44" r="4" fill={jupiterPalette.cyan} />
        <circle cx="176" cy="162" r="3" fill={jupiterPalette.cyan} />
      </g>
    </svg>
  </Box>
);

export default JupiterOrb;
