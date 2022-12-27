'use client'

import Account from './Account'
import LoginForm from '../login/LoginForm'
import NoSession from './NoSession'
import React from 'react'
import { auth } from 'firebase-admin'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/navigation'

const ProfilePage = () => {
  
  const { user } = useAuth()
  
  
  const router = useRouter()


  if (user) {
    return <Account user={user} />
  } else {
     return <NoSession/>
  }
}

export default ProfilePage
