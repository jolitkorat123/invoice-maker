import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    try {
      // Always fallback to English — ignore saved language or device language
      return callback('en');
    } catch (error) {
      console.error('Language detection failed:', error);
      return callback('en');
    }
  },
  init: () => {},
  cacheUserLanguage: async (language) => {
    try {
      await AsyncStorage.setItem('user-language', language);
    } catch (error) {
      console.error('Error caching language:', error);
    }
  },
};

const resources = {
  en: {
    translation: {
      choose_language: 'Choose your Language',
      done: 'Done',
      continue: 'Continue',
      templates: 'Templates',
      company_profile: 'Company Profile',
      logo: 'Logo',
      company_name: 'Company Name',
      company_email: 'Company Email',
      company_phone: 'Company Phone',
      company_address: 'Company Address',
      tax_number: 'Tax No.',
      tax_types: 'Tax Types',
      nature_of_business: 'Nature of Business',
    },
  },
  hi: {
    translation: {
      choose_language: 'अपनी भाषा चुनें',
      done: 'हो गया',
      continue: 'जारी रखें',
      templates: 'टेम्पलेट्स',
      company_profile: 'कंपनी प्रोफ़ाइल',
      logo: 'लोगो',
      company_name: 'कंपनी का नाम',
      company_email: 'कंपनी ईमेल',
      company_phone: 'कंपनी फोन',
      company_address: 'कंपनी पता',
      tax_number: 'टैक्स नंबर',
      tax_types: 'कर के प्रकार',
      nature_of_business: 'व्यवसाय का प्रकार',
    },
  },
  id: {
    translation: {
      choose_language: 'Pilih Bahasa Anda',
      done: 'Selesai',
      continue: 'Lanjutkan',
      templates: 'Template',
      company_profile: 'Profil Perusahaan',
      logo: 'Logo',
      company_name: 'Nama Perusahaan',
      company_email: 'Email Perusahaan',
      company_phone: 'Telepon Perusahaan',
      company_address: 'Alamat Perusahaan',
      tax_number: 'No. Pajak',
      tax_types: 'Jenis Pajak',
      nature_of_business: 'Jenis Usaha',
    },
  },
  ko: {
    translation: {
      choose_language: '언어 선택',
      done: '완료',
      continue: '계속',
      templates: '템플릿',
      company_profile: '회사 프로필',
      logo: '로고',
      company_name: '회사 이름',
      company_email: '회사 이메일',
      company_phone: '회사 전화',
      company_address: '회사 주소',
      tax_number: '세금 번호',
      tax_types: '세금 종류',
      nature_of_business: '사업 유형',
    },
  },
  pt: {
    translation: {
      choose_language: 'Escolha seu idioma',
      done: 'Concluído',
      continue: 'Continuar',
      templates: 'Modelos',
      company_profile: 'Perfil da Empresa',
      logo: 'Logotipo',
      company_name: 'Nome da Empresa',
      company_email: 'Email da Empresa',
      company_phone: 'Telefone da Empresa',
      company_address: 'Endereço da Empresa',
      tax_number: 'Número Fiscal',
      tax_types: 'Tipos de Impostos',
      nature_of_business: 'Natureza do Negócio',
    },
  },
  ru: {
    translation: {
      choose_language: 'Выберите язык',
      done: 'Готово',
      continue: 'Продолжить',
      templates: 'Шаблоны',
      company_profile: 'Профиль компании',
      logo: 'Логотип',
      company_name: 'Название компании',
      company_email: 'Электронная почта компании',
      company_phone: 'Телефон компании',
      company_address: 'Адрес компании',
      tax_number: 'Номер налога',
      tax_types: 'Типы налогов',
      nature_of_business: 'Сфера деятельности',
    },
  },
  fr: {
    translation: {
      choose_language: 'Choisissez votre langue',
      done: 'Terminé',
      continue: 'Continuer',
      templates: 'Modèles',
      company_profile: "Profil de l'entreprise",
      logo: 'Logo',
      company_name: "Nom de l'entreprise",
      company_email: "Email de l'entreprise",
      company_phone: "Téléphone de l'entreprise",
      company_address: "Adresse de l'entreprise",
      tax_number: 'N° fiscal',
      tax_types: "Types d'impôts",
      nature_of_business: "Nature de l'activité",
    },
  },
  de: {
    translation: {
      choose_language: 'Wählen Sie Ihre Sprache',
      done: 'Fertig',
      continue: 'Weiter',
      templates: 'Vorlagen',
      company_profile: 'Firmenprofil',
      logo: 'Logo',
      company_name: 'Firmenname',
      company_email: 'Firmen-E-Mail',
      company_phone: 'Firmentelefon',
      company_address: 'Firmenadresse',
      tax_number: 'Steuernummer',
      tax_types: 'Steuerarten',
      nature_of_business: 'Art des Geschäfts',
    },
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

