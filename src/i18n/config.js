import i18next from 'i18next'; 

import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
    .init({
        fallbackLng: 'es',
        resources: {
            'es': {
                translations: require('../locales/es/translations.json')
            },
            'en': {
                translations: require('../locales/en/translations.json')
            }
        },
        ns: ['translations'],
        defaultNS: 'translations',
        returnObjects: true,
        debug: process.env.NODE_ENV === 'development',
        interpolation: {
            escapeValue: false, //not needed for react!!
        },
        react: {
            wait: true,
            useSuspense: false,
        },
    });

i18next.languages = ['es', 'en'];

export default i18next;
