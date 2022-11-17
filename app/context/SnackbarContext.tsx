import { AlertType, SnackbarContextType } from '../../utils/types'
import React, { createContext, useState } from 'react'

const snackbarInitial: AlertType = {
  open: false,
  message: '',
  severity: 'success',
}

const Context = createContext<SnackbarContextType>({
  alert: snackbarInitial,
  setAlert: (value:AlertType) => {},
})

export function SnackbarContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [alert, setAlert] = useState<AlertType>(snackbarInitial)
  const value = { alert, setAlert }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default Context
