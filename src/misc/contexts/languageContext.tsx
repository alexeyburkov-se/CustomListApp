import { LanguageCode } from "../constants";
import { createSimpleStatefulContext } from "./simpleStatefulContext";

export const languageStorageKey = "language";

const [p, u] = createSimpleStatefulContext<
  [LanguageCode, (l: LanguageCode) => void],
  LanguageCode
>(["en-US", () => ({})], ([lang, set]) => [
  lang,
  (l: LanguageCode) => {
    localStorage.setItem(languageStorageKey, l);
    set(l);
  },
]);

export const LanguageProvider = p;

export const useLanguage = u;
