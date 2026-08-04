// src/i18n/I18nCacheProvider.tsx
import React, { useEffect } from 'react';
import type { i18n as I18nInstance } from 'i18next';
import { useTranslateStore } from '../stores/translateStore';

type Props = {
  i18n: I18nInstance;
  initialLang?: string;
  children: React.ReactNode;
};

export const I18nCacheProvider: React.FC<Props> = ({ i18n, children }) => {
  const lang = useTranslateStore((s) => s.lang);

  // Asegurar i18next en el idioma actual (por si vienes con cache)
  useEffect(() => {
    if (i18n.language !== lang) void i18n.changeLanguage(lang);
  }, [i18n, lang]);

  return <>{children}</>;
};

export const useI18nCache = () => {
  const lang = useTranslateStore((s) => s.lang);
  const setLang = useTranslateStore((s) => s.setLang);
  return { lang, setLang };
};
