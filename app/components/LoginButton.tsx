'use client'

import React, { useEffect, useState } from 'react'

import { Button } from '@mui/material'
import LoginButtonDialog from './LoginButtonDialog'
import Logout from '../login/Logout'
import { useAuth } from '../hooks/useAuth'

const LoginButton = () => {
  const [open, setOpen] = useState<boolean>(false)
  const { user } = useAuth()

  const handleButton = () => setOpen((prev) => !prev)
  const handleClose = () => setOpen(false)

  return (
    <>
      {!user ? <Button onClick={handleButton}>Login</Button> : <Logout />}
      {open ? <LoginButtonDialog open={open} onClose={handleClose} /> : null}
    </>
  )
}

export default LoginButton
