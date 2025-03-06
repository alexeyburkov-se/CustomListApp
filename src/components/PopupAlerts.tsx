import { Translate } from "@mui/icons-material";
import {
  SlideProps,
  Slide,
  Snackbar,
  Alert,
  AlertTitle,
  Button,
  SnackbarCloseReason,
  MenuItem,
  ListItemIcon,
  Popper,
  Paper,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import {
  languageAlertDuration,
  LanguageCode,
  separatorAlertDuration,
  separatorByLanguage,
  SeparatorType,
  supportedLanguages,
  supportedSeparators,
} from "../misc/constants";
import { useDecimalSeparator } from "../misc/contexts/decimalSeparatorContext";
import {
  createRef,
  FunctionComponent,
  PropsWithChildren,
  ReactNode,
  RefObject,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

interface ParentRefParam {
  parentRef: RefObject<HTMLElement>;
}

interface BasePopperProps extends ParentRefParam {
  actionElement: ReactNode;
}

const SlideTransition = (props: SlideProps) => (
  <Slide {...props} direction="up" />
);

const BaseAlert = ({
  open,
  onClose,
  duration,
  alertTitle,
  alertDescription,
  Primary,
  Secondary,
}: {
  open: boolean;
  onClose: () => void;
  duration: number | null;
  alertTitle: string;
  alertDescription: string;
  Primary: ReactNode;
  Secondary: FunctionComponent<ParentRefParam>;
}) => {
  const snackbarRef = createRef<HTMLElement>();

  const handleAlertClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason == "clickaway") {
      return;
    }
    onClose();
  };

  return (
    <Snackbar
      open={open}
      ref={snackbarRef}
      autoHideDuration={duration}
      onClose={handleAlertClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      TransitionComponent={SlideTransition}
    >
      <Alert onClose={onClose} severity="warning">
        <AlertTitle>{alertTitle}</AlertTitle>
        <Stack>
          <div>{alertDescription}</div>
          <Box sx={{ justifyContent: "flex-end", display: "flex" }}>
            {Primary}
            {<Secondary parentRef={snackbarRef} />}
          </Box>
        </Stack>
      </Alert>
    </Snackbar>
  );
};

const BasePopper = ({
  children,
  parentRef,
  actionElement,
}: PropsWithChildren<BasePopperProps>) => {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const alternativeOpen = Boolean(anchorElement);
  const [zIndex, setZIndex] = useState(0);

  const toggleAnchor = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (alternativeOpen) {
      setAnchorElement(null);
    } else {
      setZIndex(
        Number(parentRef?.current?.computedStyleMap().get("z-index") ?? 0),
      );
      setAnchorElement(event.currentTarget);
    }
  };

  return (
    <>
      <Button onClick={toggleAnchor}>{actionElement}</Button>
      <Popper
        open={alternativeOpen}
        anchorEl={anchorElement}
        sx={{ zIndex: zIndex + 1 }}
        placement="top-end"
      >
        <Paper>{children}</Paper>
      </Popper>
    </>
  );
};

export const LanguageAlert = ({
  open,
  updateDecimalSeparator,
  onClose,
}: {
  open: boolean;
  updateDecimalSeparator: boolean;
  onClose: () => void;
}) => {
  const { t, i18n } = useTranslation();
  const [, setSeparator] = useDecimalSeparator();

  return (
    <BaseAlert
      open={open}
      onClose={onClose}
      duration={languageAlertDuration}
      alertTitle={t("alerts.language.title")}
      alertDescription={
        t("alerts.language.description") +
        supportedLanguages[i18n.language as LanguageCode].name
      }
      Primary={
        <Button
          onClick={() => {
            i18n.changeLanguage();
            onClose();
          }}
        >
          {t("alerts.language.primaryAction")}
        </Button>
      }
      Secondary={({ parentRef }: ParentRefParam) => (
        <BasePopper
          parentRef={parentRef}
          actionElement={
            <>
              <Translate />
              {t("alerts.language.secondaryAction")}
            </>
          }
        >
          {(
            Object.entries(supportedLanguages) as {
              [K in LanguageCode]: [K, (typeof supportedLanguages)[K]];
            }[LanguageCode][]
          ).map((val, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                i18n.changeLanguage(val[0]);
                if (updateDecimalSeparator) {
                  setSeparator(separatorByLanguage[val[0]], false);
                }
                onClose();
              }}
            >
              <ListItemIcon>{val[1].icon}</ListItemIcon>
              {val[1].name}
            </MenuItem>
          ))}
        </BasePopper>
      )}
    />
  );
};

export const DecimalSeparatorAlert = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  const [separator, setSeparator] = useDecimalSeparator();

  return (
    <BaseAlert
      open={open}
      onClose={onClose}
      duration={separatorAlertDuration}
      alertTitle={t("alerts.separator.title")}
      alertDescription={t("alerts.separator.description")}
      Primary={
        <Button
          onClick={() => {
            onClose();
            setSeparator(separator);
          }}
        >
          {t("alerts.separator.primaryAction")}
        </Button>
      }
      Secondary={({ parentRef }: ParentRefParam) => (
        <BasePopper
          parentRef={parentRef}
          actionElement={t("alerts.separator.secondaryAction")}
        >
          {(
            Object.entries(supportedSeparators) as {
              [K in SeparatorType]: [K, (typeof supportedSeparators)[K]];
            }[SeparatorType][]
          ).map((val, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                setSeparator(val[0]);
                onClose();
              }}
            >
              <Typography sx={{ flex: 1 }}>
                {t(`settings.separator.${val[0]}`)}:&nbsp;
              </Typography>
              {val[1]}
            </MenuItem>
          ))}
        </BasePopper>
      )}
    />
  );
};
