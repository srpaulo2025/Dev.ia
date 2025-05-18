import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translations
import translationEN from "./locales/en.json";
import translationPT from "./locales/pt.json";
import translationES from "./locales/es.json";
import translationFR from "./locales/fr.json";
import translationDE from "./locales/de.json";
import translationIT from "./locales/it.json";
import translationJA from "./locales/ja.json";
import translationZH from "./locales/zh.json";

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  pt: {
    translation: translationPT
  },
  es: {
    translation: translationES
  },
  fr: {
    translation: translationFR
  },
  de: {
    translation: translationDE
  },
  it: {
    translation: translationIT
  },
  ja: {
    translation: translationJA
  },
  zh: {
    translation: translationZH
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem("language") || "pt", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
