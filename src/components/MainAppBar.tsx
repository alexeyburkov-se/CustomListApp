import { Outlet } from "react-router";
import {
  fallbackLanguage,
  githubURL,
  LanguageCode,
  languageStorageKey,
  SeparatorType,
  supportedLanguages,
  supportedSeparators,
} from "../misc/constants";
import { ListDataProvider } from "../misc/contexts/listDataContext";
import { useState } from "react";
import {
  DecimalSeparatorProvider,
  separatorStorageKey,
} from "../misc/contexts/decimalSeparatorContext";
import { DecimalSeparatorAlert, LanguageAlert } from "./PopupAlerts";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import { GitHub, Settings } from "@mui/icons-material";
import { SettingsDrawer } from "./SettingsDrawer";

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

const appBarHeightStyle = { minHeight: "64px" } as const;

const fallbackSeparator = "dot";

export const MainAppBar = () => {
  const [foundLanguage, setFoundLanguage] = useState(getLanguage);
  const [foundSeparator, setFoundSeparator] = useState(getDecimalSeparator);

  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setSettingsOpen((prev) => !prev);
  };

  return (
    <ListDataProvider defaultValue={null}>
      <DecimalSeparatorProvider
        defaultValue={foundSeparator ?? fallbackSeparator}
      >
        <AppBar position="fixed">
          <Toolbar sx={appBarHeightStyle}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", flex: 1 }}>
              <IconButton href={githubURL} target="_blank">
                <GitHub />
              </IconButton>
              <IconButton onClick={toggleDrawer}>
                <Settings />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar sx={appBarHeightStyle} />
        <Outlet />
        <SettingsDrawer
          open={settingsOpen}
          onClose={toggleDrawer}
          titleElementStyle={appBarHeightStyle}
        />
        <LanguageAlert
          open={!foundLanguage}
          updateDecimalSeparator={!foundSeparator}
          onClose={() => setFoundLanguage(fallbackLanguage)}
        />
        <DecimalSeparatorAlert
          open={!!foundLanguage && !foundSeparator}
          onClose={() => setFoundSeparator(fallbackSeparator)}
        />
      </DecimalSeparatorProvider>
    </ListDataProvider>
  );
};
