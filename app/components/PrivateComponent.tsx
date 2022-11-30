'use client'

import React, { useEffect } from 'react'
import { Session, useSession, useUser } from '@supabase/auth-helpers-react'

import AccessDenied from './AccessDenied'
import { AlertType } from '../../utils/types'
import { useRouter } from 'next/navigation'
import useSnackbar from '../hooks/useSnackbar'

interface Props {
  children: JSX.Element
}

const PrivateComponent = ({ children }: Props) => {
  const router = useRouter()
  const { setAlert } = useSnackbar()
  const session: Session | null = useSession()

  if (session) {
    return children
  }
  return null
}

export default PrivateComponent
