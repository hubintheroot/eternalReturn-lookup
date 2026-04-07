import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ko from '@/features/coupon-management/locales/ko.json';
import en from '@/features/coupon-management/locales/en.json';
import ja from '@/features/coupon-management/locales/ja.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ko: { coupon: ko },
      en: { coupon: en },
      ja: { coupon: ja },
    },
    supportedLngs: ['ko', 'en', 'ja'],
    fallbackLng: 'ko',
    ns: ['coupon'],
    defaultNS: 'coupon',
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'coupon-lang',
      caches: ['localStorage'],
    },
  });

export default i18n;
