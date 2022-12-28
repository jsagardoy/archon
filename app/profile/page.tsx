'use client'

import Account from './Account'
import NoSession from './NoSession'
import React from 'react'
import { useAuth } from '../hooks/useAuth'

const ProfilePage = () => {
  const { user } = useAuth()

  if (user) {
    return <Account user={user} />
  } else {
    return <NoSession />
  }
}

export default ProfilePage
