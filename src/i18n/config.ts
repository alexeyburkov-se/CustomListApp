import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { languageStorageKey, supportedLanguages } from "../misc/constants";
import englishUSA from "./locales/en-US/main.json";
import russianRussia from "./locales/en-US/main.json";

const hasLanguage = window.localStorage.getItem(languageStorageKey) != null;

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: false,
    supportedLngs: Object.keys(supportedLanguages),
    fallbackLng: "en-US",
    detection: {
      order: ["localStorage"],
      caches: ["localStorage"],
      lookupLocalStorage: languageStorageKey,
    },
    resources: {
      "en-US": {
        translation: englishUSA,
      },
      "ru-RU": {
        translation: russianRussia,
      },
    },
  });

if (!hasLanguage) {
  window.localStorage.removeItem(languageStorageKey)
}
