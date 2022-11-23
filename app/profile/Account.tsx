'use client'

import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  TextField,
} from '@mui/material'
import {
  Session,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react'
import { useEffect, useRef, useState } from 'react'

import { Database } from '../../utils/database.types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Profiles = Database['public']['Tables']['profiles']['Row']

interface Props {}

export default function Account({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const [loading, setLoading] = useState(true)
 /*  const [username, setUsername] = useState<Profiles['username']>(null)
  const [website, setWebsite] = useState<Profiles['website']>(null)
  const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null)
  const [vken, setVken] = useState<Profiles['vken']>(null)
  const [fullName, setFullName] = useState<Profiles['full_name']>(null) */
  const usernameRef = useRef<HTMLInputElement>(null)
  const avatarURLRef = useRef<HTMLInputElement>(null)
  const websiteRef = useRef<HTMLInputElement>(null)
  const vkenRef = useRef<HTMLInputElement>(null)
  const fullNameRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    getProfile()
  }, [session])

  const getProfile = async () => {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url, vken, full_name`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        /* setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
        setVken(data.vken)
        setFullName(data.full_name) */
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
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async ()=> {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      const updates = {
        id: user.id,
        username:usernameRef.current?.value??'',
        website:websiteRef.current?.value??'',
        avatar_url:avatarURLRef.current?.value??'',
        updated_at: new Date().toISOString(),
        vken:vkenRef.current?.value??'',
        full_name: fullNameRef.current?.value??'',
        rol: user.role??'',
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = () => {
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
        {/* <Box>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={session.user.email} disabled />
        </Box>
        <Box>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        <Box>
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="website"
            value={website || ''}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </Box>

        <Box>
          <button
            className="button primary block"
            onClick={() => updateProfile({ username, website, avatar_url })}
            disabled={loading}
          >
            {loading ? 'Loading ...' : 'Update'}
          </button>
        </Box>

        <Box>
          <button
            className="button block"
            onClick={() => {
              supabase.auth.signOut()
              router.push('/')
            }}
          >
            Sign Out
          </button>
        </Box> */}
      </Box>
    </Container>
  )
}
