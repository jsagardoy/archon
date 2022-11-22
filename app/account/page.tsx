'use client'

import Account from './Account'
import React from 'react'
import { useSession } from '@supabase/auth-helpers-react'

const AccountPage = () => {
  const session = useSession()
  return session ? <Account session={session} /> : <p>No session</p>
}

export default AccountPage
