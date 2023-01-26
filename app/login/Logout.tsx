'use client'

import { AlertType } from '../../utils/types'
import { Button } from '@mui/material'
import React from 'react'
import { useAuth } from '../hooks/useAuth'
import useSnackbar from '../hooks/useSnackbar'

const Logout = () => {
  const { logout, user } = useAuth()
  const { setAlert } = useSnackbar()


  const handleLogout = async () => {
    try {
      if (logout) {
        logout()
        const newAlert: AlertType = {
          message: `Logout`,
          severity: 'success',
          open: true,
        }
        setAlert(newAlert)
      }
    } catch (error: any) {
      const newAlert: AlertType = {
        message: error.message,
        severity: 'error',
        open: true,
      }
      setAlert(newAlert)
    }
  }
  return (
    <Button sx={{marginRight:'1rem'}} color='secondary' disabled={!user} onClick={() => handleLogout()}>
      Logout
    </Button>
  )
}

export default Logout
