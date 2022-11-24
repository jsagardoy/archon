'use client'

import Account from './Account'
import LoginForm from '../login/LoginForm'
import NoSession from './NoSession'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '@supabase/auth-helpers-react'

const ProfilePage = () => {
  const session = useSession()
  const router = useRouter()


  if (session) {
    return <Account session={session} />
  } else {
     return <NoSession/>
  }
}

export default ProfilePage
