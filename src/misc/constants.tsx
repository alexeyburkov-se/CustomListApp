import USACountryFlag from "../assets/countries/usa.svg?react";
import RussiaCountryFlag from "../assets/countries/ru.svg?react";
import { SvgIcon, Typography } from "@mui/material";

const separatorStyle = {
  fontSize: 30,
  fontWeight: "bold",
  lineHeight: 0,
} as const;

export const supportedSeparators = {
  comma: (
    <>
      <Typography>123</Typography>
      <Typography sx={separatorStyle}>,</Typography>
      <Typography>456</Typography>
    </>
  ),
  dot: (
    <>
      <Typography>123</Typography>
      <Typography sx={separatorStyle}>.</Typography>
      <Typography>456</Typography>
    </>
  ),
  arabicComma: (
    <>
      <Typography>123</Typography>
      <Typography sx={separatorStyle}>٫</Typography>
      <Typography>456</Typography>
    </>
  ),
} as const;

export type SeparatorType = keyof typeof supportedSeparators;

export const separatorByLanguage = {
  "en-US": "dot",
  "ru-RU": "comma",
} as const satisfies Record<LanguageCode, SeparatorType>;

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

export const fallbackLanguage = "en-US" satisfies LanguageCode;

export const languageAlertDuration = 10000;
export const separatorAlertDuration = 10000;

export const githubURL = "https://github.com/alexeyburkov-se/CustomListApp";

export const languageStorageKey = "language";
