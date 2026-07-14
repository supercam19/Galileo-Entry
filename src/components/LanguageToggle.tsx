import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useLanguage } from '../i18n/LanguageContext';
import type { Lang } from '../i18n/translations';

const LanguageToggle = () => {
  const { lang, setLang } = useLanguage();

  return (
    <ToggleButtonGroup
      value={lang}
      exclusive
      size="small"
      onChange={(_, value: Lang | null) => value && setLang(value)}
      aria-label="Language selection"
      sx={{
        '& .MuiToggleButton-root': {
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: '0.7rem',
          color: 'text.secondary',
          borderColor: 'divider',
          px: 1.5,
          '&.Mui-selected': {
            color: 'background.default',
            bgcolor: 'secondary.main',
          },
          '&.Mui-selected:hover': {
            bgcolor: 'secondary.main',
          },
        },
      }}
    >
      <ToggleButton value="en" aria-label="English">
        English
      </ToggleButton>
      <ToggleButton value="fr" aria-label="Fran\u00e7ais">
        {'Fran\u00e7ais'}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LanguageToggle;
