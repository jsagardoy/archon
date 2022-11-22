'use client'

import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

import { Container } from '@mui/material'
import { Provider } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  const providers: Provider[] = ['google']
  const router = useRouter()
 
  return (
    <Container>
      {!session ? (
        <Auth
          supabaseClient={supabase}
          providers={providers}
          appearance={{ theme: ThemeSupa }}
        />
      ) : <p>User already logged</p>
      }
    </Container>
  )
}

export default LoginForm
