'use client'

import { Box, Container, FormControl, TextField } from '@mui/material'
import React, { useRef } from 'react'

const Signin = () => {

    const emailRef = useRef<HTMLInputElement | undefined>(null)
    const passwordRef = useRef<HTMLInputElement | undefined>(null)
    const confirmRef = useRef<HTMLInputElement | undefined>(null)
    
  return (
    <Container>
      <Box component="form">
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
                  
        </FormControl>
      </Box>
    </Container>
  )
}

export default Signin