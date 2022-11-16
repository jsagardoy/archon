'use client'

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
} from '@mui/material'
import React, { useRef, useState } from 'react'

import LoginForm from './LoginForm'
import LoginIcon from '@mui/icons-material/Login'

const MiniLogin = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false)

  const handleOnClickLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpenMenu((prev) => !prev)
  }

  const handleClose = () => {
    setOpenMenu(false)
  }
  return (
    <Box>
      <Button onClick={handleOnClickLogin}>
        Login <LoginIcon />
      </Button>
      <Dialog open={openMenu} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <LoginForm handleClose={handleClose}/>
      </Dialog>
    </Box>
  )
}

export default MiniLogin
