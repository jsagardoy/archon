'use client'

import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material'
import React, { useRef, useState } from 'react'

import { AlertType } from '../../utils/types'
import Link from 'next/link'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/navigation'
import useSnackbar from '../hooks/useSnackbar'

const SignupForm = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmRef = useRef<HTMLInputElement>(null)
  const [showError, setShowError] = useState<boolean>(false)
  const { setAlert } = useSnackbar()

  const router = useRouter()
  const { signup } = useAuth()
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const newUser = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirm: confirmRef.current?.value,
    }
    if (newUser.password !== newUser.confirm) {
      setShowError(true)
    }

    if (
      signup &&
      newUser.email &&
      newUser.password &&
      newUser.password === newUser.confirm
    ) {
      try {
        const resp = await signup(newUser.email, newUser.password)
        const newAlert: AlertType = {
          message: `Please check ${resp.user.email} to verify your account. Check also in your Spam folder!`,
          severity: 'success',
          open: true,
        }
        setAlert(newAlert)
        router.push('/')
      } catch (error: any) {
        const newAlert: AlertType = {
          message: error.message,
          severity: 'error',
          open: true,
        }
        setAlert(newAlert)
      }
    }
  }

  const clearError = () => setShowError(false)

  return (
    <Container>
      <Box component="form" onSubmit={handleLogin}>
        <FormControl fullWidth>
          <TextField inputRef={emailRef} type="email" label="Email" required />
          <TextField
            inputRef={passwordRef}
            type="password"
            label="Password"
            onChange={clearError}
            required
          />
          <TextField
            inputRef={confirmRef}
            type="password"
            label="Confirm password"
            onChange={clearError}
            required
          />
          <Button disabled={showError} type="submit">
            Signup
          </Button>
          <FormHelperText error={showError}>
            {showError ? 'Password and confirm password are not equal' : ''}
          </FormHelperText>
        </FormControl>
      </Box>
      <Box>
        <Typography variant="caption">
          Already have an accont? <Link href="/login">LogIn</Link>{' '}
        </Typography>
      </Box>
    </Container>
  )
}

export default SignupForm
