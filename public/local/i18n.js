// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      hello: "Hello, World!",
    },
  },
  hi: {
    translation: {
      welcome: "स्वागत है",
      hello: "नमस्ते दुनिया!",
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for React
    },
  });

export default i18n;
