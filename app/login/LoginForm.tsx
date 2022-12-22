'use client'

import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  TextField,
  Typography,
} from '@mui/material'
import React, { useRef, useState } from 'react'
import { ZodFormattedError, z } from 'zod'

import { AlertType } from '../../utils/types'
import Link from 'next/link'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/navigation'
import useSnackbar from '../hooks/useSnackbar'

interface Props {
  handleClose?: () => void
}
const LoginForm = ({ handleClose }: Props) => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { setAlert } = useSnackbar()
  const { login } = useAuth()

  const FormSchema = z.object({
    email: z.string()?.min(1).email(),
    password: z.string().min(6),
  })

  const [validationResult, setValidationResult] =
    useState<ZodFormattedError<{ email: string; password: string }, string>>()
  const [showError, setShowError] = useState<boolean>(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const newUser = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    }
    const validation = FormSchema.safeParse(newUser)
    if (!validation.success) {
      setValidationResult(validation.error.format())
    }
    if (validation.success && newUser.email && newUser.password && login) {
      try {
        const resp = await login(newUser.email, newUser.password)
        const newAlert: AlertType = {
          message: `Welcome ${resp.user.displayName ?? resp.user.email}`,
          severity: 'success',
          open: true,
        }
        setAlert(newAlert)
        if (handleClose) {
          handleClose()
        }
        router.push('/')
      } catch (error: any) {
        const newAlert: AlertType = {
          message: error.message,
          severity: 'error',
          open: true,
        }
        setAlert(newAlert)
        setShowError(true)
      }
    }
  }
  const clearError = () => {
    setShowError(false)
  }

  return (
    <Container>
      <Box component="form" onSubmit={handleLogin}>
        <FormControl fullWidth>
          <FormLabel>Login form</FormLabel>
          <TextField
            error={validationResult?.email?._errors !== undefined}
            onChange={clearError}
            helperText={validationResult?.email?._errors.join(', ') || ''}
            inputRef={emailRef}
            type="email"
            label="Email"
            required
          />
          <TextField
            inputRef={passwordRef}
            onChange={clearError}
            error={validationResult?.password?._errors !== undefined}
            helperText={validationResult?.password?._errors.join(', ') || ''}
            type="password"
            label="Password"
            required
          />
          <Button type="submit">Login</Button>
          <FormHelperText error={showError}>
            {showError ? 'Incorrect user/password' : ''}
          </FormHelperText>
        </FormControl>
      </Box>
      <Box>
        <Typography variant="caption">
          Not registred?
          <Link onClick={handleClose} href="/signup">
            SignUp
          </Link>
        </Typography>
      </Box>
      <Box>
        <Typography variant="caption">
          Forgot your password?
          <Link href="/reset">Reset</Link>
        </Typography>
      </Box>
    </Container>
  )
}

export default LoginForm
