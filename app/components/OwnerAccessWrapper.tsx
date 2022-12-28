import { Profile, Tournament } from '../../database/database.types'
import React, { useEffect, useState } from 'react'

import { AlertType } from '../../utils/types'
import getProfile from '../../services/getProfile'
import getTournamentInfo from '../../services/getTournamentInfo'
import { useAuth } from '../hooks/useAuth'
import useSnackbar from '../hooks/useSnackbar'

interface Props {
  children: any
  tournamentId: string
}

const OwnerAccessWrapper = ({ children, tournamentId }: Props) => {
  //show only if user is owner

  const [userData, setUserData] = useState<{ id: string; rol: string } | null>(
    null
  )
  const [tournamentData, setTournamentData] = useState<{
    id: string
    user_id: string
  } | null>(null)
  const { user } = useAuth()
  const { setAlert } = useSnackbar()

  const getUserInfo = async () => {
    try {
      if (user) {
        const profile: Profile | null = await getProfile(user.uid)

        if (!profile) {
          throw new Error('Error fetching profile')
        }
        if (profile) {
          setUserData({ id: profile.userId, rol: profile.rol ?? 'user' })
        }
      }
    } catch (error) {
      const newAlert: AlertType = {
        open: true,
        severity: 'error',
        message: 'Error accessing profile',
      }
      setAlert(newAlert)
      console.error(error)
    }
  }

  const getTournamentInfoData = async () => {
    try {
      if (user) {
        const tournament: Tournament | null = await getTournamentInfo(
          tournamentId
        )

        if (!tournament) {
         throw new Error('Error fetching tournament information')
        }
        if (tournament) {
          setTournamentData({
            id: tournament.tournamentId,
            user_id: tournament.userId,
          })
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
    getTournamentInfoData()
  }, [user])

  if (userData?.rol === 'prince' && tournamentData?.user_id === userData.id) {
    return children
  } else {
    return null
  }
}

export default OwnerAccessWrapper
