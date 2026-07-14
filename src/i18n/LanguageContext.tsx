import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { translations } from './translations';
import type { Lang, TranslationDict } from './translations';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (path: string) => string;
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const resolvePath = (dict: TranslationDict, path: string): string => {
  const segments = path.split('.');
  let current: unknown = dict;
  for (const segment of segments) {
    if (typeof current === 'object' && current !== null && segment in current) {
      current = (current as Record<string, unknown>)[segment];
    } else {
      return path;
    }
  }
  return typeof current === 'string' ? current : path;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>('en');

  const value = useMemo<LanguageContextValue>(() => {
    const locale = lang === 'fr' ? 'fr-CA' : 'en-CA';
    return {
      lang,
      setLang,
      t: (path: string) => resolvePath(translations[lang], path),
      formatNumber: (numberValue, options) => new Intl.NumberFormat(locale, options).format(numberValue),
    };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
};
