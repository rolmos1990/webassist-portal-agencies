import { useEffect } from 'react';
import { useI18nCache } from './i18nCacheProvider';
import { i18nStorage, type LangStrings } from './i18nStorage';
import i18n from '../i18n/i18n';

// Hooks generados por Orval (ajusta los nombres si difieren)
import {
  useGetLangStringsVersion,
  useGetLangStrings,
} from '../api/generated';

const NAMESPACE = 'translation';

export function I18nBootstrap() {
    const { lang, token, setToken } = useI18nCache();

    const { data: fetchedToken } = useGetLangStringsVersion<string>(
        lang,
        {
          query: {
            enabled: true,
            select: (res: any) => res?.data?.version ?? null,
          },
        }
      );

      const tokenChanged = !!fetchedToken && fetchedToken !== token;

      console.log('language - tokenChanged: ', tokenChanged);

      const { data: fetchedStrings } = useGetLangStrings<LangStrings>(
        lang,
        {
          query: {
            enabled: tokenChanged,
            select: (res: any) => (res?.data ?? {}) as LangStrings,
          },
        }
      );
      
  useEffect(() => {
    (async () => {
      if (!fetchedToken) {
        const cached = i18nStorage.getStrings(lang);
        if (Object.keys(cached).length > 0) {
          i18n.addResourceBundle(lang, NAMESPACE, cached, true, true);
        }
        if (i18n.language !== lang) await i18n.changeLanguage(lang);
        return;
      }

      if (tokenChanged && fetchedStrings && Object.keys(fetchedStrings).length > 0) {
        i18nStorage.setToken(lang, fetchedToken);
        i18nStorage.setStrings(lang, fetchedStrings);
        setToken(fetchedToken);

        i18n.addResourceBundle(lang, NAMESPACE, fetchedStrings, true, true);
        if (i18n.language !== lang) await i18n.changeLanguage(lang);
      }

      if (!tokenChanged) {
        const cached = i18nStorage.getStrings(lang);
        if (Object.keys(cached).length > 0) {
          i18n.addResourceBundle(lang, NAMESPACE, cached, true, true);
        }
        if (i18n.language !== lang) await i18n.changeLanguage(lang);
      }
    })();
  }, [lang, fetchedToken, tokenChanged, fetchedStrings]);

  return null;
}
