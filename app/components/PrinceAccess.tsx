import React, { use, useEffect, useState } from 'react'
import {
  useSession,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react'

import AccessDenied from './AccessDenied'
import { Database } from '../../utils/database.types'
import { Session } from '@supabase/auth-helpers-nextjs'
import useSnackbar from '../hooks/useSnackbar'

interface Props {
  children: JSX.Element
}

const PrinceAccess = ({ children }: Props) => {
  const session: Session | null = useSession()
  const supabase = useSupabaseClient<Database>()
  const [userData, setUserData] = useState<{ id: string; rol: string } | null>(
    null
  )
  const user = useUser()
  const { setAlert } = useSnackbar()

  const getUserInfo = async () => {
    try {
      if (session && user) {
        const { data, error, status } = await supabase
          .from('profiles')
          .select('id, rol')
          .eq('id', user?.id)
          .single()

        if (error && status !== 406) {
          throw error
        }
        if (data) {
          setUserData({ id: data.id, rol: data.rol ?? 'user' })
        }
      }
    } catch (error) {
      const newAlert = {
        open: true,
        severity: 'error',
        message: 'Error accesing profile',
      }
      console.error(error)
    }
  }
  useEffect(() => {
    getUserInfo()
  }, [session, user])

  if (session && userData?.rol === 'prince') {
    return children
  } else {
    return null
  }
}

export default PrinceAccess
