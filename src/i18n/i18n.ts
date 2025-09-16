import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar traducciones
import enCommon from './locales/en/common.json';
import esCommon from './locales/es/common.json';

// Configuración de i18next
i18n
  .use(LanguageDetector) // Detecta el idioma del navegador
  .use(initReactI18next) // Pasa i18n a react-i18next
  .init({
    fallbackLng: 'es', // Idioma por defecto
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // No es necesario para React
    },
    resources: {
      en: {
        common: enCommon,
      },
      es: {
        common: esCommon,
      },
    },
  });

export default i18n;
