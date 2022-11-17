'use client'

import React from 'react'
import SignUpForm from './SignUpForm'
import SnackbarComponent from '../components/SnackbarComponent'
import { SnackbarContextProvider } from '../context/SnackbarContext'

const Signin = () => (
  <>
    <SnackbarContextProvider>
      <SignUpForm />
      <SnackbarComponent />
    </SnackbarContextProvider>
  </>
)

export default Signin
