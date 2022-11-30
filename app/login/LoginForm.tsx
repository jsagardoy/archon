'use client'

import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

import Account from '../profile/Account'
import { AlertType } from '../../utils/types'
import { Container } from '@mui/material'
import { Provider } from '@supabase/supabase-js'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useSnackbar from '../hooks/useSnackbar'

const LoginForm = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  const providers: Provider[] = ['google']
  const router = useRouter()
  const { setAlert } = useSnackbar()

  const redirectToHome = () => router.push('/')

  if (session) {
    const newAlert: AlertType = {
      open: true,
      severity: 'info',
      message: 'User already logged in. You have been redirected to Home!!',
    }
    setAlert(newAlert)
    redirectToHome()
    return <></>
  }

  if (!session) {
    return (
      <Container>
        <Auth
          supabaseClient={supabase}
          providers={providers}
          appearance={{ theme: ThemeSupa }}
        />
      </Container>
    )
  }
  return <></>
}

export default LoginForm
