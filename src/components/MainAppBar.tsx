import { Outlet } from "react-router";
import {
  fallbackLanguage,
  fallbackSeparator,
  LanguageCode,
  SeparatorType,
  supportedLanguages,
  supportedSeparators,
} from "../misc/constants";
import {
  LanguageProvider,
  languageStorageKey,
} from "../misc/contexts/languageContext";
import { ListDataProvider } from "../misc/contexts/listDataContext";
import { useState } from "react";
import {
  DecimalSeparatorProvider,
  separatorStorageKey,
} from "../misc/contexts/decimalSeparatorContext";
import { DecimalSeparatorAlert, LanguageAlert } from "./PopupAlerts";

const getLanguage = (): LanguageCode | null => {
  const lang = localStorage.getItem(languageStorageKey);
  return lang
    ? lang in supportedLanguages
      ? (lang as LanguageCode)
      : null
    : null;
};

const getDecimalSeparator = (): SeparatorType | null => {
  const sep = localStorage.getItem(separatorStorageKey);
  return sep
    ? sep in supportedSeparators
      ? (sep as SeparatorType)
      : null
    : null;
};

export const MainAppBar = () => {
  const [language, setLanguage] = useState(getLanguage());
  const [separator, setSeparator] = useState(getDecimalSeparator());

  return (
    <ListDataProvider defaultValue={null}>
      <LanguageProvider defaultValue={language ?? fallbackLanguage}>
        <DecimalSeparatorProvider defaultValue={separator ?? fallbackSeparator}>
          <Outlet />
          <LanguageAlert open={!language} onClose={() => setLanguage("en-US")} alternativeAction={() => ({})} />
          <DecimalSeparatorAlert open={!!language && !separator} onClose={() => setSeparator("language")} alternativeAction={() => ({})} />
        </DecimalSeparatorProvider>
      </LanguageProvider>
    </ListDataProvider>
  );
};
