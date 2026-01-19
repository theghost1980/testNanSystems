import i18next from "i18next";

import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "es",
    resources: {
      es: {
        translations: require("../locales/es/translations.json"),
      },
      en: {
        translations: require("../locales/en/translations.json"),
      },
    },
    ns: ["translations"],
    defaultNS: "translations",
    returnObjects: true,
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: true,
      useSuspense: false,
    },
  });

i18next.languages = ["es", "en"];

export default i18next;
