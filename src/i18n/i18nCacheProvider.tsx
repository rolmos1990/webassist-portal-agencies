// src/i18n/I18nCacheProvider.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { i18n as I18nInstance } from 'i18next';
import { i18nStorage } from './i18nStorage';

type Props = {
  i18n: I18nInstance;
  initialLang?: string;
  namespace?: string; // por si lo quieres usar luego
  children: React.ReactNode;
};

type Ctx = {
  lang: string;
  token: string | null;
  setLang: (next: string) => void;
  setToken: (next: string | null) => void;
};

const CtxI18n = createContext<Ctx | null>(null);

export const I18nCacheProvider: React.FC<Props> = ({
  i18n,
  initialLang = 'es',
  children,
}) => {
  const [lang, setLangState] = useState<string>(() => i18nStorage.getLang() ?? initialLang);
  const [token, setTokenState] = useState<string | null>(() => i18nStorage.getToken(lang));

  const setLang = (next: string) => setLangState(next);
  const setToken = (next: string | null) => setTokenState(next);

  // Persistir lang y sincronizar token al cambiar de idioma
  useEffect(() => {
    i18nStorage.setLang(lang);
    setTokenState(i18nStorage.getToken(lang));
  }, [lang]);

  // Asegurar i18next en el idioma actual (por si vienes con cache)
  useEffect(() => {
    if (i18n.language !== lang) void i18n.changeLanguage(lang);
  }, [i18n, lang]);

  const value = useMemo<Ctx>(() => ({
    lang, token, setLang, setToken,
  }), [lang, token]);

  return <CtxI18n.Provider value={value}>{children}</CtxI18n.Provider>;
};

export const useI18nCache = () => {
  const ctx = useContext(CtxI18n);
  if (!ctx) throw new Error('useI18nCache must be used within I18nCacheProvider');
  return ctx;
};
