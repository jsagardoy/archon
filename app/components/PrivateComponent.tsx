'use client'

import { Session, useSession, useUser } from '@supabase/auth-helpers-react'

import AccessDenied from './AccessDenied'
import React from 'react'

interface Props {
  children: JSX.Element
}
const PrivateComponent = ({ children }: Props) => {
  const session: Session | null = useSession()
  if (session) {
    return children
  } else {
    return <AccessDenied />
  }
}

export default PrivateComponent
