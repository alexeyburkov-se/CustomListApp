import {
  Brightness5,
  Brightness7,
  Close,
  Palette,
  Settings,
  SettingsBrightness,
  Translate,
} from "@mui/icons-material";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Select,
  SelectChangeEvent,
  MenuItem,
  SvgIcon,
  ButtonGroup,
  Button,
  Typography,
  useColorScheme,
  styled,
  SelectProps,
  DrawerProps,
  IconButton,
  SxProps,
  Theme,
  Box,
} from "@mui/material";
import {
  LanguageCode,
  SeparatorType,
  supportedLanguages,
  supportedSeparators,
} from "../misc/constants";
import DecimalSeparator from "../assets/decimalPoint.svg?react";
import { useDecimalSeparator } from "../misc/contexts/decimalSeparatorContext";
import { useTranslation } from "react-i18next";

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  ".MuiDrawer-paper": {
    backgroundColor:
      theme.palette.mode == "light"
        ? "rgba(255, 255, 255, 0.8)"
        : "rgba(18, 18, 18, 0.8)",
    [theme.breakpoints.up("xs")]: {
      borderRadius: "0",
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      borderRadius: "10px 0 0 10px",
    },
  },
}));

const drawerWidths = {
  "en-US": "420px",
  "ru-RU": "510px",
} as const satisfies Record<LanguageCode, string>;

const RightStyledDrawer = (props: Omit<DrawerProps, "anchor">) => (
  <StyledDrawer {...props} anchor="right" />
);

const SettingsList = styled(List)({
  paddingTop: "0",
});

const RightAlignBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  flex: 1,
  flexDirection: "row",
});

const NoVerticalPaddingListItem = styled(ListItem)({
  paddingTop: "0",
  paddingBottom: "0",
});

const SettingsSelect = styled(Select)({
  width: "60%",
  "& .MuiSelect-select": { display: "flex", alignItems: "center" },
});

const SmallSettingsSelect = (props: Omit<SelectProps, "size">) => {
  return <SettingsSelect {...props} size="small" />;
};

const languageOptions = (
  Object.entries(supportedLanguages) as {
    [K in LanguageCode]: [K, (typeof supportedLanguages)[K]];
  }[LanguageCode][]
).map((val, index) => (
  <MenuItem key={index} value={val[0]}>
    <ListItemIcon sx={{ marginTop: "auto", marginBottom: "auto" }}>
      {val[1].icon}
    </ListItemIcon>
    <ListItemText>{val[1].name}</ListItemText>
  </MenuItem>
));

const ThemeButtonGroup = ({
  mode,
  setMode,
}: Pick<ReturnType<typeof useColorScheme>, "mode" | "setMode">) => {
  const { t } = useTranslation();

  return (
    <ButtonGroup>
      {(
        [
          { name: "light", icon: <Brightness7 /> },
          { name: "system", icon: <SettingsBrightness /> },
          { name: "dark", icon: <Brightness5 /> },
        ] as const
      ).map((val) => (
        <Button
          key={val.name}
          onClick={() => setMode(val.name)}
          variant={mode == val.name ? "contained" : "outlined"}
        >
          {val.icon}
          <Typography>{t(`settings.theme.${val.name}`)}</Typography>
        </Button>
      ))}
    </ButtonGroup>
  );
};

export const SettingsDrawer = ({
  open,
  onClose,
  titleElementStyle,
}: {
  open: boolean;
  onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
  titleElementStyle: SxProps<Theme>;
}) => {
  const { t, i18n } = useTranslation();
  const [separator, setSeparator] = useDecimalSeparator();

  const separatorOptions = (
    Object.entries(supportedSeparators) as {
      [K in SeparatorType]: [K, (typeof supportedSeparators)[K]];
    }[SeparatorType][]
  ).map((val, index) => (
    <MenuItem key={index} value={val[0]}>
      <Typography sx={{ flex: 1 }}>
        {t(`settings.separator.${val[0]}`)}:
      </Typography>
      {val[1]}
    </MenuItem>
  ));

  return (
    <RightStyledDrawer
      open={open}
      onClose={onClose}
      sx={{
        ".MuiDrawer-paper": {
          width: { sm: drawerWidths[i18n.language as LanguageCode] },
        },
      }}
    >
      <SettingsList>
        <ListItem sx={titleElementStyle}>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="h5">{t("settings.title")}</Typography>
          </ListItemText>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </ListItem>
        <Divider />
        <NoVerticalPaddingListItem>
          <ListItemIcon>
            <Translate />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="overline">{t("settings.language")}</Typography>
          </ListItemText>
        </NoVerticalPaddingListItem>
        <ListItem>
          <RightAlignBox>
            <SmallSettingsSelect
              inputProps={{ id: "appLanguage" }}
              value={i18n.language}
              onChange={(event: SelectChangeEvent<unknown>) => {
                i18n.changeLanguage(event.target.value as LanguageCode);
              }}
            >
              {languageOptions}
            </SmallSettingsSelect>
          </RightAlignBox>
        </ListItem>
        <NoVerticalPaddingListItem>
          <ListItemIcon>
            <SvgIcon viewBox="0 0 128 128">
              <DecimalSeparator />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText>
            <Typography variant="overline">
              {t("settings.separator.title")}
            </Typography>
          </ListItemText>
        </NoVerticalPaddingListItem>
        <ListItem>
          <RightAlignBox>
            <SmallSettingsSelect
              inputProps={{ id: "appDecimalSeparator" }}
              value={separator}
              onChange={(event: SelectChangeEvent<unknown>) => {
                setSeparator(event.target.value as SeparatorType);
              }}
            >
              {separatorOptions}
            </SmallSettingsSelect>
          </RightAlignBox>
        </ListItem>
        <NoVerticalPaddingListItem>
          <ListItemIcon>
            <Palette />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="overline">
              {t("settings.theme.title")}
            </Typography>
          </ListItemText>
        </NoVerticalPaddingListItem>
        <ListItem
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <ThemeButtonGroup {...useColorScheme()} />
        </ListItem>
      </SettingsList>
    </RightStyledDrawer>
  );
};
