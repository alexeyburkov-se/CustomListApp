import { Translate } from "@mui/icons-material";
import {
  SlideProps,
  Slide,
  Snackbar,
  Alert,
  AlertTitle,
  Button,
  SnackbarCloseReason,
} from "@mui/material";
import {
  languageFallbackAlertDuration,
  separatorFallbackAlertDuration,
} from "../misc/constants";
import { useLanguage } from "../misc/contexts/languageContext";
import { useDecimalSeparator } from "../misc/contexts/decimalSeparatorContext";

const SlideTransition = (props: SlideProps) => (
  <Slide {...props} direction="up" />
);

export const LanguageAlert = ({
  open,
  onClose,
  alternativeAction,
}: {
  open: boolean;
  onClose: () => void;
  alternativeAction: () => void;
}) => {
  const [language, setLanguage] = useLanguage();

  const handleLangAlertClose = (
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
      autoHideDuration={languageFallbackAlertDuration}
      onClose={handleLangAlertClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      TransitionComponent={SlideTransition}
    >
      <Alert onClose={onClose} severity="warning">
        <AlertTitle>Language warning</AlertTitle>
        Application loaded with default language: English (USA)
        <Button
          onClick={() => {
            onClose();
            setLanguage(language);
          }}
        >
          Continue english
        </Button>
        <Button
          onClick={() => {
            onClose();
            alternativeAction();
          }}
        >
          <Translate />
          Translate
        </Button>
      </Alert>
    </Snackbar>
  );
};

export const DecimalSeparatorAlert = ({
  open,
  onClose,
  alternativeAction,
}: {
  open: boolean;
  onClose: () => void;
  alternativeAction: () => void;
}) => {
  const [separator, setSeparator] = useDecimalSeparator();

  const handleSepAlertClose = (
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
      autoHideDuration={separatorFallbackAlertDuration}
      onClose={handleSepAlertClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      TransitionComponent={SlideTransition}
    >
      <Alert onClose={onClose} severity="warning">
        <AlertTitle>Decimal separator warning</AlertTitle>
        Application loaded with default decimal separator according to your
        preferred language
        <Button
          onClick={() => {
            onClose();
            setSeparator(separator);
          }}
        >
          Continue english separator
        </Button>
        <Button
          onClick={() => {
            onClose();
            alternativeAction();
          }}
        >
          Change separator
        </Button>
      </Alert>
    </Snackbar>
  );
};
