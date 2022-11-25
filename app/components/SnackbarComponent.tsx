'use client'

import React, { useEffect } from 'react'

import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import useSnackbar from '../hooks/useSnackbar'

const SnackbarComponent = () => {
  const { alert, setAlert } = useSnackbar()
  const { open, message, severity } = alert

  const handleClose = () => {
    setAlert({ ...alert, open: false })
  }

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarComponent
