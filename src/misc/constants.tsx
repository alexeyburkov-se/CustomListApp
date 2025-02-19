import USACountryFlag from "../assets/countries/usa.svg?react";
import RussiaCountryFlag from "../assets/countries/ru.svg?react";
import { SvgIcon } from "@mui/material";

export const supportedSeparators = {
  comma: "1234,5678",
  dot: "1234.5678",
  arabicComma: "1234٫5678",
  language: "defined by language",
} as const;

export type SeparatorType = keyof typeof supportedSeparators;

export const fallbackSeparator = "language";

export const supportedLanguages = {
  "en-US": {
    name: "English (USA)",
    icon: (
      <SvgIcon viewBox="0 0 32 32">
        <USACountryFlag />
      </SvgIcon>
    ),
  },
  "ru-RU": {
    name: "Русский",
    icon: (
      <SvgIcon viewBox="0 0 32 32">
        <RussiaCountryFlag />
      </SvgIcon>
    ),
  },
} as const;

export type LanguageCode = keyof typeof supportedLanguages;

export const fallbackLanguage = "en-US";

export const languageAlertDuration = 10000;
export const separatorAlertDuration = 10000;

export const githubURL = "https://github.com/alexeyburkov-se/CustomListApp";
