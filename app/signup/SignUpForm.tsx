'use client'

import { Box, Button, Container, FormControl, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'

import { AlertType } from '../../utils/types'
import {
SignUpWithPasswordCredentials,
} from '@supabase/supabase-js'
import { supabase } from '../../utils/supabase'
import useSnackbar from '../hooks/useSnackbar'

const SignUpForm = () => {
  const emailRef = useRef<HTMLInputElement | undefined>(null)
  const passwordRef = useRef<HTMLInputElement | undefined>(null)
  const confirmRef = useRef<HTMLInputElement | undefined>(null)

  const { alert, setAlert } = useSnackbar()


  const createUser = async (credentials: SignUpWithPasswordCredentials) => {
    try {
      const { data, error } = await supabase.auth.signUp(credentials)

      if (error) {
        const newMessage: AlertType = {
          open: true,
          message: 'Error creating user.Please try again',
          severity: 'error',
        }
        setAlert(newMessage)
      }

      if (data.user && !data.session) {
        const newMessage: AlertType = {
          open: true,
          message: 'User created',
          severity: 'success',
        }
        setAlert(newMessage)
      }
    } catch (error) {
      const newMessage: AlertType = {
        open: true,
        message: 'Error creating user.Please try again',
        severity: 'error',
      }
      setAlert(newMessage)
    }
  }

  const handleSubmit = (event:React.FormEvent) => {
    event.preventDefault()
    const email = emailRef.current?.value
    const password = passwordRef.current?.value
    const confirm = confirmRef.current?.value

    if (email && password && password === confirm) {
      //create user in db
      const credentials: SignUpWithPasswordCredentials = {
        email: email,
        password: password,
      }
      createUser(credentials)
    }
  }

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit}>
        <FormControl>
          <TextField
            id="emailId"
            required
            inputRef={emailRef}
            type="email"
            label="Email"
          />
          <TextField
            id="emailId"
            required
            inputRef={passwordRef}
            type="password"
            label="Password"
          />
          <TextField
            id="emailId"
            required
            inputRef={confirmRef}
            type="password"
            label="Confirm password"
          />
          <Button type="submit">Create</Button>
        </FormControl>
      </Box>
    </Container>
  )
}

export default SignUpForm
