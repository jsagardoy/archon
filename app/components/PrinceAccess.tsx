'use client'

import React, { useEffect, useState } from 'react'

import AccessDenied from './AccessDenied'
import { AlertType } from '../../utils/types'
import getProfile from '../../services/getProfile'
import { useAuth } from '../hooks/useAuth'
import useSnackbar from '../hooks/useSnackbar'

interface Props {
  children: JSX.Element
}

const PrinceAccess = ({ children }: Props) => {
  //show only if user has prince role

  const [userData, setUserData] = useState<{ id: string; rol: string } | null>(
    null
  )
  const { user } = useAuth()
  const { setAlert } = useSnackbar()

  const getUserInfo = async () => {
    try {
      if (user) {
        const profile = await getProfile(user.uid)
        if (profile) {
          setUserData({ id: profile.userId, rol: profile.rol ?? 'user' })
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
  }, [user])

  if (userData?.rol === 'prince') {
    return children
  } else {
    return null
  }
}

export default PrinceAccess
