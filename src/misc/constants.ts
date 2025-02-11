export const supportedSeparators = {
  comma: ",",
  dot: ".",
  arabicComma: "٫",
  language: "defined by language",
};

export type SeparatorType = keyof typeof supportedSeparators;

export const fallbackSeparator = "language";

export const supportedLanguages = {
  "en-US": "English (USA)",
  "ru-RU": "Русский",
};

export type LanguageCode = keyof typeof supportedLanguages;

export const fallbackLanguage = "en-US";

export const languageAlertDuration = 10000;
export const separatorAlertDuration = 10000;
