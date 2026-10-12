import i18next from "i18next";

import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "es",
    // Solo existen es y en. Con esto un navegador "en-US" o "es-VE" se resuelve
    // a "en" / "es": el resto del código compara i18n.language con "es"/"en".
    supportedLngs: ["es", "en"],
    // El `lang` de <html> lo pone el sitio (gatsby-ssr.js, siempre "es"): no es una
    // preferencia del visitante. Sin quitar `htmlTag` del orden por defecto, ese
    // "es" exacto ganaba a un "en-US" guardado o del navegador.
    detection: {
      order: [
        "querystring",
        "cookie",
        "localStorage",
        "sessionStorage",
        "navigator",
      ],
    },
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
      useSuspense: false,
    },
  });

export default i18next;
