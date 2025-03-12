import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export interface LeaveRouteModalDialogProps {
  open: boolean;
  stayAction: () => void;
  leaveAction: () => void;
  title: string;
  description: string;
}

export const LeaveRouteModalDialog = ({
  open,
  stayAction,
  leaveAction,
  title,
  description,
}: LeaveRouteModalDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={stayAction}>
          {t("alerts.routeLeaving.stayAction")}
        </Button>
        <Button onClick={leaveAction}>
          {t("alerts.routeLeaving.leaveAction")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
