// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Your translations
const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      hello: "Hello, World!",
      CompanyProfile:"Company Profile"
    },
  },
  hi: {
    translation: {
      welcome: "स्वागत है",
      hello: "नमस्ते दुनिया!",
      CompanyProfile:" Company Profile"
    },
  },
};

i18n
  .use(initReactI18next) // 👈 This is required
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
