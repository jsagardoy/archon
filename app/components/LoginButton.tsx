'use client'

import React, { useState } from 'react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

import { AlertType } from '../../utils/types'
import { Button } from '@mui/material'
import { Database } from '../../utils/database.types'
import LoginButtonDialog from './LoginButtonDialog'
import useSnackbar from '../hooks/useSnackbar'

const LoginButton = () => {
  const [open, setOpen] = useState<boolean>(false)
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const { setAlert } = useSnackbar()

  const handleLogOut = () => {
    const newAlert: AlertType = {
      open: true,
      severity: 'success',
      message: 'User logged out',
    }
    setAlert(newAlert)
    supabase.auth.signOut()
  }
  const handleButton = () => setOpen((prev) => !prev)
  const handleClose = () => setOpen(false)

  return (
    <>
      {!user ? (
        <Button onClick={handleButton}>Login</Button>
      ) : (
        <Button onClick={handleLogOut}>Logout</Button>
      )}
      {open ? <LoginButtonDialog open={open} onClose={handleClose} /> : null}
    </>
  )
}

export default LoginButton
