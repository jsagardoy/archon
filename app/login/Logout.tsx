'use client'

import { AlertType } from '../../utils/types'
import { Button } from '@mui/material'
import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/navigation'
import useSnackbar from '../hooks/useSnackbar'

const Logout = () => {
  const { logout, user } = useAuth()
  const { setAlert } = useSnackbar()

  const handelLogout = (): void => {
    try {
      if (logout) {
        logout()
        const newAlert: AlertType = {
          message: `Signout`,
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
  return <Button disabled={!user} onClick={() => handelLogout()}>Logout</Button>
}

export default Logout
