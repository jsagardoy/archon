'use client'

import Account from './Account'
import NoSession from './NoSession'
import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/navigation'

const ProfilePage = () => {
  const { user } = useAuth()
  const router = useRouter()

  if (user) {
    return <Account user={user} />
  } else {
    return <NoSession />
  }
}

export default ProfilePage
