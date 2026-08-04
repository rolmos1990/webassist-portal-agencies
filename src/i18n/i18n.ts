import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Traducciones por defecto (fallback antes/ante fallos de las traducciones dinámicas del backend)
import enDefault from './locales/en/default.json';
import esDefault from './locales/es/default.json';

// Configuración de i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    debug: process.env.NODE_ENV === 'development',
    interpolation: { escapeValue: false },
    detection: {
      order: ['path', 'localStorage', 'navigator', 'htmlTag'],
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
      excludeCacheFor: ['cimode'],
    },
    resources: {
      en: { translation: enDefault },
      es: { translation: esDefault },
    },
  });

export default i18n;
