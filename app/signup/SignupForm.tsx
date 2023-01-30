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
import { ZodFormattedError, z } from 'zod'

import { AlertType } from '../../utils/types'
import Link from 'next/link'
import { Profile } from '../../database/database.types'
import createProfile from '../../services/createProfile'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/navigation'
import useSnackbar from '../hooks/useSnackbar'

const SignupForm = () => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmRef = useRef<HTMLInputElement>(null)
  const [showError, setShowError] = useState<boolean>(false)
  const { setAlert } = useSnackbar()

  const FormSchema = z.object({
    email: z.string()?.min(1).email(),
    password: z.string().min(6),
    confirm: z.string().min(6),
  })

  const [validationResult, setValidationResult] =
    useState<
      ZodFormattedError<
        { email: string; password: string; confirm: string },
        string
      >
    >()

  const router = useRouter()
  const { signup } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const newUser = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirm: confirmRef.current?.value,
    }
    const validation = FormSchema.safeParse(newUser)

    if (!validation.success) {
      setValidationResult(validation.error.format())
    }

    if (newUser.password !== newUser.confirm) {
      setShowError(true)
    }

    if (
      validation.success &&
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
    <Container
      sx={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: '1rem',
      }}
    >
      <Typography color="primary" variant="h5" sx={{ marginBottom: '1rem' }}>
        Signup
      </Typography>
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FormControl
          fullWidth
          sx={{
            display: 'flex',
            gap: '1rem',
          }}
        >
          <TextField
            inputRef={emailRef}
            error={validationResult?.email?._errors !== undefined}
            helperText={validationResult?.email?._errors.join(', ') || ''}
            type="email"
            label="Email"
            required
          />
          <TextField
            inputRef={passwordRef}
            error={validationResult?.password?._errors !== undefined}
            helperText={validationResult?.password?._errors.join(', ') || ''}
            type="password"
            label="Password"
            onChange={clearError}
            required
          />
          <TextField
            inputRef={confirmRef}
            error={validationResult?.confirm?._errors !== undefined}
            helperText={validationResult?.confirm?._errors.join(', ') || ''}
            type="password"
            label="Confirm password"
            onChange={clearError}
            required
          />
          <Box>
            <Button
              color="primary"
              sx={{ border: '1px solid', width: '30%' }}
              disabled={showError}
              type="submit"
            >
              Signup
            </Button>
          </Box>
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
