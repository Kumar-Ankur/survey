import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import surveyEn from "./locales/en/aashviSurveyMisc.json";
import surveyHn from "./locales/hn/aashviSurveyMisc.json";


const resources = {
  en: {
    translation: surveyEn,
  },
  hn: {
    translation: surveyHn,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
