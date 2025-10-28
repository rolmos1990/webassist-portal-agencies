import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar traducciones
import enCommon from './locales/en/common.json';
import esCommon from './locales/es/common.json';

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
      en: { common: enCommon },
      es: { common: esCommon },
    },
  });

export default i18n;
