import {
  Brightness5,
  Brightness7,
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

const StyledDrawer = styled(Drawer)(() => ({
  ".MuiDrawer-paper": {
    borderRadius: "10px 0 0 10px",
    // background: "rgba(256, 256, 256, 0.79)",
  },
}));

const RightStyledDrawer = (props: Omit<DrawerProps, "anchor">) => (
  <StyledDrawer {...props} anchor="right" />
);

const RightAlignListItem = styled(ListItem)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  flexDirection: "row",
}));

const NoVerticalPaddingListItem = styled(ListItem)(() => ({
  paddingTop: "0",
  paddingBottom: "0",
}));

const SettingsSelect = styled(Select)(() => ({
  width: "205px",
}));

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
}: {
  open: boolean;
  onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
}) => {
  const [language, setLanguage] = useLanguage();
  const [separator, setSeparator] = useDecimalSeparator();

  return (
    <RightStyledDrawer open={open} onClose={onClose}>
      <List>
        <ListItem>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText>
            <Typography variant="h5">Settings</Typography>
          </ListItemText>
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
        <RightAlignListItem>
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
        </RightAlignListItem>
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
        <RightAlignListItem>
          <SmallSettingsSelect
            inputProps={{ id: "appDecimalSeparator" }}
            value={separator}
            onChange={(event: SelectChangeEvent<unknown>) => {
              setSeparator(event.target.value as SeparatorType);
            }}
          >
            {separatorOptions}
          </SmallSettingsSelect>
        </RightAlignListItem>
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
      </List>
    </RightStyledDrawer>
  );
};
