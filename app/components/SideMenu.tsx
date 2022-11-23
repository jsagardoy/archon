'use client'

import {
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Link as MuiLink,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import {
  User,
  useSession,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react'

import Box from '@mui/material/Box'
import { Database } from '../../utils/database.types'
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu'

const SideMenu = () => {
  const user = useUser()
  const supabase = useSupabaseClient<Database>()
  const [activeUser, setActiveUser] = useState<User | null>(user)
  const [showDrawer, setShowDrawer] = useState<boolean>(false)
  const menuElements: string[] = ['Home', 'Tournaments', 'Profile', 'Login']

  const toogleDrawer = (): void => {
    setShowDrawer((prev) => !prev)
  }
  const handleClose = (): void => {
    setShowDrawer(false)
  }

  const handleSignOut = () => supabase.auth.signOut()
  const handleListOfElements = (elem: string) => {
    if (elem === 'Home') {
      return <Link href={`/`}>{elem}</Link>
    }
    if (!activeUser) {
      return <Link href={`/${elem}`.toLocaleLowerCase()}>{elem}</Link>
    }
    if (activeUser && elem.toLocaleLowerCase() !== 'login') {
      return <Link href={`/${elem}`.toLocaleLowerCase()}>{elem}</Link>
    }

    return <MuiLink onClick={handleSignOut}>Sign Out</MuiLink>
  }
  useEffect(() => {
    setActiveUser(user)
    return () => {
      setActiveUser(null)
    }
  }, [user])

  const menuList = () => (
    <Box>
      <List>
        {menuElements.map((elem) => (
          <ListItem key={elem} onClick={handleClose}>
            {handleListOfElements(elem)}
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <>
      <IconButton onClick={toogleDrawer}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={showDrawer} onClose={handleClose}>
        {menuList()}
      </Drawer>
    </>
  )
}

export default SideMenu
