'use client'

import Account from './Account'
import LoginForm from '../login/LoginForm'
import React from 'react'
import { useSession } from '@supabase/auth-helpers-react'

const ProfilePage = () => {
  const session = useSession()
  return session ? <Account session={session} /> : <LoginForm />
}

export default ProfilePage
