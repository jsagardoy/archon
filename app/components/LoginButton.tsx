'use client'

import React, { useState } from 'react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

import { Button } from '@mui/material'
import { Database } from '../../utils/database.types'
import LoginButtonDialog from './LoginButtonDialog'

const LoginButton = () => {
  const [open, setOpen] = useState<boolean>(false)
  const supabase = useSupabaseClient<Database>()
  const user = useUser()

  const handleLogOut = () => supabase.auth.signOut()
  const handleButton = () => setOpen((prev) => !prev)
  const handleClose = () => setOpen(false)

  return (
    <>
      {!user ? (
        <Button onClick={handleButton}>Login</Button>
      ) : (
        <Button onClick={handleLogOut}>Logout</Button>
      )}
      {open ? <LoginButtonDialog open={open} onClose={handleClose} /> : null}
    </>
  )
}

export default LoginButton
