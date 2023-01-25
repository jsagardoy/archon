'use client'

import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import React, { useRef, useState } from 'react'
import { ZodFormattedError, z } from 'zod'

import { AlertType } from '../../utils/types'
import GoogleButton from 'react-google-button'
import Link from 'next/link'
import { UserCredential } from 'firebase/auth'
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
  const { login, loginGoogle } = useAuth()

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
  const handleLoginGoogle = async () => {
    try {
      if (loginGoogle) {
        const resp: UserCredential = await loginGoogle()
        if (resp) {
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
        }
      }
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
  const clearError = () => {
    setShowError(false)
  }

  return (
    <Container>
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h6">Login form</Typography>
        <FormControl fullWidth>
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
          <Button color="secondary" type="submit">
            Login
          </Button>
          <FormHelperText error={showError}>
            {showError ? 'Incorrect user/password' : ''}
          </FormHelperText>
        </FormControl>
      </Box>
      <Box>
        <Typography sx={{ display: 'flex', gap: '0.2rem' }} variant="caption">
          Not registred?
          <Link onClick={handleClose} href="/signup">
            SignUp
          </Link>
        </Typography>
      </Box>
      <Box>
        <Typography sx={{ display: 'flex', gap: '0.2rem' }} variant="caption">
          Forgot your password?
          <Link href="/reset">Reset</Link>
        </Typography>
      </Box>
      <Box sx={{marginTop:'1rem', paddingBottom:'0.5em'}}>
        <GoogleButton onClick={handleLoginGoogle} />
      </Box>
    </Container>
  )
}

export default LoginForm
