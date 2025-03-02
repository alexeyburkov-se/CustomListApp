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
import { useLanguage } from "../misc/contexts/languageContext";
import {
  LanguageCode,
  SeparatorType,
  supportedLanguages,
  supportedSeparators,
} from "../misc/constants";
import DecimalSeparator from "../assets/decimalPoint.svg?react";
import { useDecimalSeparator } from "../misc/contexts/decimalSeparatorContext";

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
      width: "auto",
    },
  },
}));

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
  width: "205px",
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
    <ListItemText primary={val[1].name} />
  </MenuItem>
));

const separatorOptions = (
  Object.entries(supportedSeparators) as {
    [K in SeparatorType]: [K, (typeof supportedSeparators)[K]];
  }[SeparatorType][]
).map((val, index) => (
  <MenuItem key={index} value={val[0]}>
    {val[1]}
  </MenuItem>
));

const ThemeButtonGroup = ({
  mode,
  setMode,
}: Pick<ReturnType<typeof useColorScheme>, "mode" | "setMode">) => (
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
        <Typography>{val.name}</Typography>
      </Button>
    ))}
  </ButtonGroup>
);

export const SettingsDrawer = ({
  open,
  onClose,
  titleElementStyle,
}: {
  open: boolean;
  onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
  titleElementStyle: SxProps<Theme>;
}) => {
  const [language, setLanguage] = useLanguage();
  const [separator, setSeparator] = useDecimalSeparator();

  return (
    <RightStyledDrawer open={open} onClose={onClose}>
      <SettingsList>
        <ListItem sx={titleElementStyle}>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="h5">Settings</Typography>
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
            <Typography variant="overline">Language</Typography>
          </ListItemText>
        </NoVerticalPaddingListItem>
        <ListItem>
          <RightAlignBox>
            <SmallSettingsSelect
              inputProps={{ id: "appLanguage" }}
              value={language}
              onChange={(event: SelectChangeEvent<unknown>) => {
                setLanguage(event.target.value as LanguageCode);
              }}
              sx={{ "& .MuiSelect-select": { display: "flex" } }}
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
            <Typography variant="overline">Decimal separator</Typography>
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
            <Typography variant="overline">Theme</Typography>
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
