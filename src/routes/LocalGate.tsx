import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useI18nCache } from '../i18n/i18nCacheProvider';
import i18n from '../i18n/i18n';

const SUPPORTED = ['es', 'en'] as const;
type Lang = typeof SUPPORTED[number];
const isLang = (x: string | undefined): x is Lang => !!x && SUPPORTED.includes(x as Lang);
const DEFAULT_LANG: Lang = 'es';

export default function LocaleGate() {
  const { lang } = useParams();
  const loc = useLocation();
  const { lang: cachedLang, setLang } = useI18nCache();

  if (!isLang(lang)) {
    const fixed = useMemo(() => {
      const parts = loc.pathname.split('/');
      parts[1] = DEFAULT_LANG;
      return parts.join('/');
    }, [loc.pathname]);
    return <Navigate to={fixed} replace />;
  }

  useEffect(() => {
    if (cachedLang !== lang) setLang(lang);
    if (i18n.language !== lang) void i18n.changeLanguage(lang);
  }, [lang, cachedLang, setLang]);

  return <Outlet />;
}
