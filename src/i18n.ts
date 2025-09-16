import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpBackend)           // carga los JSON de /public/locales
  .use(LanguageDetector)      // detecta idioma del navegador
  .use(initReactI18next)      // conecta con React
  .init({
    fallbackLng: "en",        // idioma por defecto
    debug: false,             // pon true si quieres logs
    interpolation: { escapeValue: false }
  });

export default i18n;