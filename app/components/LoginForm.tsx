'use client'

import {
  Box,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from '@mui/material'
import React, { useRef } from 'react'

import Link from 'next/link'

interface Props {
  handleClose: () => void
}

const LoginForm = (props: Props) => {
  const { handleClose } = props
  
    const emailRef = useRef<HTMLInputElement | undefined>(null)
  const passwordRef = useRef<HTMLInputElement | undefined>(null)
  
    const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log(emailRef.current?.value ?? '')
    console.log(passwordRef.current?.value ?? '')
  }
  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit}>
        <FormControl focused>
          <TextField
            id="emailId"
            required
            inputRef={emailRef}
            type="email"
            label="Email"
          />
          <TextField
            id="passwordId"
            required
            inputRef={passwordRef}
            type="password"
            label="Password"
          />
          <Button type="submit">Submit</Button>
          <Typography variant="body1">
            {' '}
            Not registered?.
            <Link onClick={handleClose} href="/signin">
              Sign in
            </Link>
          </Typography>
        </FormControl>
      </Box>
      <Box>
        <Button>Login with Google</Button>
      </Box>
    </Container>
  )
}

export default LoginForm
