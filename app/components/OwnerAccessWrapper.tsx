import React, { use, useEffect, useState } from 'react'
import {
  useSession,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react'

import AccessDenied from './AccessDenied'
import { AlertType } from '../../utils/types'
import { Database } from '../../utils/database.types'
import { Session } from '@supabase/auth-helpers-nextjs'
import useSnackbar from '../hooks/useSnackbar'

interface Props {
    children: any,
    tournamentId:string
}

const OwnerAccessWrapper = ({ children, tournamentId }: Props) => {
  const session: Session | null = useSession()
  const supabase = useSupabaseClient<Database>()
    const [userData, setUserData] = useState<{ id: string, rol: string } | null>(
    null
  )
    const [tournamentData, setTournamentData] = useState<{ id: string, user_id: string } | null>(
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
          setUserData({ id: data.id, rol: data.rol ?? 'user'})
        }
      }
    } catch (error) {
      const newAlert: AlertType = {
        open: true,
        severity: 'error',
        message: 'Error accesing profile',
      }
      setAlert(newAlert)
      console.error(error)
    }
  }
  const getTournamentInfo = async () => {
    try {
      if (session && user) {
        const { data, error, status } = await supabase
          .from('tournament')
          .select('id, user_id')
          .eq('id', tournamentId)
          .single()

        if (error && status !== 406) {
          throw error
        }
        if (data) {
          setTournamentData({ id: data.id, user_id: data.user_id})
        }
      }
    } catch (error) {
      const newAlert: AlertType = {
        open: true,
        severity: 'error',
        message: 'Error accesing profile',
      }
      setAlert(newAlert)
      console.error(error)
    }
  }
    useEffect(() => {
      getUserInfo()
      getTournamentInfo()
  }, [session, user])

  if (session && userData?.rol === 'prince' && tournamentData?.user_id===userData.id) {
    return children
  } else {
    return null
  }
}

export default OwnerAccessWrapper
