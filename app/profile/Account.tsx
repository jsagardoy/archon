'use client'

import { Box, Button, Container, FormControl, TextField } from '@mui/material'
import { FormEvent, useEffect, useRef, useState } from 'react'
import {
  Session,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react'

import { AlertType } from '../../utils/types'
import { Database } from '../../utils/database.types'
import useSnackbar from '../hooks/useSnackbar'

type Profiles = Database['public']['Tables']['profiles']['Row']

interface Props {}

export default function Account({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const [loading, setLoading] = useState(true)

  const usernameRef = useRef<HTMLInputElement>(null)
  const avatarURLRef = useRef<HTMLInputElement>(null)
  const websiteRef = useRef<HTMLInputElement>(null)
  const vkenRef = useRef<HTMLInputElement>(null)
  const fullNameRef = useRef<HTMLInputElement>(null)
  const rolRef = useRef<string>('user')

  const { setAlert } = useSnackbar()

  useEffect(() => {
    getProfile()
  }, [session])

  const getProfile = async () => {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url, vken, full_name, rol`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        if (usernameRef && usernameRef.current) {
          usernameRef.current.value = data.username ?? ''
        }
        if (avatarURLRef && avatarURLRef.current) {
          avatarURLRef.current.value = data.avatar_url ?? ''
        }
        if (websiteRef && websiteRef.current) {
          websiteRef.current.value = data.website ?? ''
        }
        if (vkenRef && vkenRef.current) {
          vkenRef.current.value = data.vken ?? ''
        }
        if (fullNameRef && fullNameRef.current) {
          fullNameRef.current.value = data.full_name ?? ''
        }
        if (rolRef && rolRef.current) {
          rolRef.current = data.rol ?? ''
        }
      }
    } catch (error) {
      const newAlert: AlertType = {
        open: true,
        severity: 'error',
        message: `Error loading user data!`,
      }
      setAlert(newAlert)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async () => {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      const updates = {
        id: user.id,
        username: usernameRef.current?.value ?? '',
        website: websiteRef.current?.value ?? '',
        avatar_url: avatarURLRef.current?.value ?? '',
        updated_at: new Date().toISOString(),
        vken: vkenRef.current?.value ?? '',
        full_name: fullNameRef.current?.value ?? '',
        rol: rolRef.current ?? '',
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error

      const newAlert: AlertType = {
        open: true,
        severity: 'success',
        message: `Profile updated!`,
      }
      setAlert(newAlert)
      
    } catch (error) {
      const newAlert: AlertType = {
        open: true,
        severity: 'error',
        message: `Error updating the data!`,
      }
      setAlert(newAlert)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = (e:FormEvent) => {
    e.preventDefault()
    updateProfile()
  }
  return (
    <Container>
      <Box component="form" onSubmit={onSubmit}>
        <FormControl fullWidth sx={{ gap: '1rem' }}>
          <TextField
            id="id_fullName"
            inputRef={fullNameRef}
            label="Full name"
            InputLabelProps={{ shrink: true }}
          />
          <Box
            id="picture_container"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <TextField
              fullWidth
              inputRef={avatarURLRef}
              id="id_avatar_url"
              label="Avatar URL"
              InputLabelProps={{ shrink: true }}
            />
            <picture>
              <img src={avatarURLRef.current?.value ?? ''} alt="user avatar" />
            </picture>
          </Box>
          <TextField
            id="id_username"
            inputRef={usernameRef}
            label="Username"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            id="id_website"
            inputRef={websiteRef}
            label="Website"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            id="id_vken"
            inputRef={vkenRef}
            label="Vken"
            InputLabelProps={{ shrink: true }}
          />
          <Button type="submit">Save</Button>
        </FormControl>
      </Box>
    </Container>
  )
}
