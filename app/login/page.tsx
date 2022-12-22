'use client'

import LoginForm from './LoginForm'
import Logout from './Logout'
import React from 'react'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
  const { user } = useAuth()
  return <>{user ? <Logout /> : <LoginForm />}</>
}

export default Login
