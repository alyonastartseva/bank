import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


import en from './locales/en/translation.json';
import ru from './locales/ru/translation.json';
import de from './locales/de/translation.json';  
import jp from './locales/jp/translation.json';   
import fr from './locales/fr/translation.json';

i18n
  
  .use(LanguageDetector)
  
  .use(initReactI18next)
  
  .init({
    
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      de: { translation: de },   
      jp: { translation: jp },   
      fr: { translation: fr },
    },
    
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      
      order: ['localStorage', 'navigator'],
      
      caches: ['localStorage'],
    },
  });

export default i18n;