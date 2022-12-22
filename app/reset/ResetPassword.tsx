'use client'

import { Box, Button, Container, TextField } from '@mui/material'
import React, { useRef } from 'react'

import { AlertType } from '../../utils/types'
import { useAuth } from '../hooks/useAuth'
import useSnackbar from '../hooks/useSnackbar'

const ResetPassword = () => {
  const { reset } = useAuth()
  const { setAlert } = useSnackbar()
  const emailRef = useRef<HTMLInputElement | null>(null)
  const handleResetPassword = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      if (reset && emailRef.current) {
        await reset(emailRef.current.value)
      }
      const newAlert: AlertType = {
        message: `Reset password email has been sent to your email account}`,
        severity: 'success',
        open: true,
      }
      setAlert(newAlert)
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
    <Container>
      <Box component="form" onSubmit={handleResetPassword}>
        <TextField type="email" required inputRef={emailRef} />
        <Button type="submit">Reset</Button>
      </Box>
    </Container>
  )
}

export default ResetPassword
