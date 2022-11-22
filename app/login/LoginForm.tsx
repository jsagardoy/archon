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
  const {setAlert} = useSnackbar()

  const redirectToHome = () => router.push('/')
  
  useEffect(() => {
    if (session) {
      const newAlert: AlertType = {
        open:true,
        severity: 'info',
        message: 'User already logged in',
      }
      setAlert(newAlert)
      redirectToHome()
    }
  }, [session])

  return (
    <Container>
      {!session ? (
        <Auth
          supabaseClient={supabase}
          providers={providers}
          appearance={{ theme: ThemeSupa }}
        />
      ) : null}
    </Container>
  )
}

export default LoginForm
