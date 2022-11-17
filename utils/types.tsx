import { AlertColor } from '@mui/material/Alert';

export type AlertType = {
  open: boolean,
  message: string,
  severity: AlertColor,
}

export type SnackbarContextType = {
  alert: AlertType,
  setAlert: (value:AlertType)=>void
}
