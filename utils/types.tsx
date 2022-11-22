import { AlertColor } from '@mui/material/Alert'

export type AlertType = {
  open: boolean
  message: string
  severity: AlertColor
}

export type SnackbarContextType = {
  alert: AlertType
  setAlert: (value: AlertType) => void
}

export type LoginType = {
  email: string
  password: string
}
export type UserContextType = {
  userId: string
  setUserId: (value: string) => void
}
