'use client'

import { Box, Button, Container, FormControl, TextField } from '@mui/material'
import { FormEvent, useEffect, useRef, useState } from 'react'

import { AlertType } from '../../utils/types'
import NoSession from './NoSession'
import { Profile } from '../../database/database.types'
import getProfile from '../../services/getProfile'
import updateProfile from '../../services/updateProfile'
import { useAuth } from '../hooks/useAuth'
import useSnackbar from '../hooks/useSnackbar'

//type Profiles = Database['public']['Tables']['profiles']['Row']

export default function Account() {
  const { user } = useAuth()
  const usernameRef = useRef<HTMLInputElement>(null)
  const avatarURLRef = useRef<HTMLInputElement>(null)
  const websiteRef = useRef<HTMLInputElement>(null)
  const vkenRef = useRef<HTMLInputElement>(null)
  const fullNameRef = useRef<HTMLInputElement>(null)
  const rolRef = useRef<string>('user')

  const { setAlert } = useSnackbar()

  useEffect(() => {
    getProfileData()
  }, [])
  const getProfileData = async () => {
    try {
      if (user) {
        const data = await getProfile(user.uid)

        if (data && (data as Profile)) {
          if (usernameRef && usernameRef.current) {
            usernameRef.current.value = data.username ?? ''
          }
          if (avatarURLRef && avatarURLRef.current) {
            avatarURLRef.current.value = data.avatarURL ?? ''
          }
          if (websiteRef && websiteRef.current) {
            websiteRef.current.value = data.website ?? ''
          }
          if (vkenRef && vkenRef.current) {
            vkenRef.current.value = data.vken ?? ''
          }
          if (fullNameRef && fullNameRef.current) {
            fullNameRef.current.value = data.fullName ?? ''
          }
          if (rolRef && rolRef.current) {
            rolRef.current = data.rol ?? ''
          }
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
    }
  }

  const updateProfileData = async () => {
    try {
      if (!user) throw new Error('No user')

      const updates: Profile = {
        userId: user.uid,
        username: usernameRef.current?.value ?? '',
        website: websiteRef.current?.value ?? '',
        avatarURL: avatarURLRef.current?.value ?? '',
        vken: vkenRef.current?.value ?? '',
        fullName: fullNameRef.current?.value ?? '',
        rol: rolRef.current ?? '',
      }

      const resp = await updateProfile(updates)

      if (!resp) throw new Error('Error updating profile')

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
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    updateProfileData()
  }
  return user ? (
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
            <Box sx={{ minWidth: 'fit-content', minHeight: 'fit-content' }}>
              <picture>
                {avatarURLRef.current && (
                  <img
                    src={avatarURLRef.current?.value ?? ''}
                    alt="user avatar"
                  />
                )}
              </picture>
            </Box>
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
          <Button disabled={!user} type="submit">
            Save
          </Button>
        </FormControl>
      </Box>
    </Container>
  ) : (
    <NoSession />
  )
}
