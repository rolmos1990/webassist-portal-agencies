import { useEffect } from 'react';
import i18n from './i18n';
import { useTranslateStore } from '../stores/translateStore';
import { buildTranslationBundle } from './translationKeys';
import { useGetLangStringsVersion, useGetLangStrings } from '../api/generated';

const NAMESPACE = 'translation';

export function I18nBootstrap() {
  const lang = useTranslateStore((s) => s.lang);
  const storedVersion = useTranslateStore((s) => s.version);
  const translates = useTranslateStore((s) => s.translates);
  const setTranslations = useTranslateStore((s) => s.setTranslations);

  const { data: fetchedVersion } = useGetLangStringsVersion<string | null>(lang, {
    query: {
      select: (res: any) => res?.data?.version ?? null,
    },
  });

  const versionChanged = !!fetchedVersion && fetchedVersion !== storedVersion;

  const { data: fetchedStrings } = useGetLangStrings<Record<string, string>>(lang, {
    query: {
      enabled: versionChanged,
      select: (res: any) => (res?.data ?? {}) as Record<string, string>,
    },
  });

  useEffect(() => {
    if (versionChanged && fetchedVersion && fetchedStrings) {
      setTranslations({ lang, version: fetchedVersion, translates: fetchedStrings });
    }
  }, [versionChanged, fetchedVersion, fetchedStrings, lang, setTranslations]);

  useEffect(() => {
    const bundle = buildTranslationBundle(translates);
    i18n.addResourceBundle(lang, NAMESPACE, bundle, true, true);
  }, [lang, translates]);

  return null;
}
