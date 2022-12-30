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

import Box from '@mui/material/Box'
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu'
import { User } from 'firebase/auth'
import useSession from '../hooks/useSession'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/navigation'

const SideMenu = () => {
  const { session } = useSession()
  const { logout } = useAuth()
  const user: User | null = session
  const [activeUser, setActiveUser] = useState<User | null>(user)
  const [showDrawer, setShowDrawer] = useState<boolean>(false)
  const menuElements: string[] = ['Home', 'Tournaments', 'Profile', 'Login']
  const router = useRouter()
  const toogleDrawer = (): void => {
    setShowDrawer((prev) => !prev)
  }
  const handleClose = (): void => {
    setShowDrawer(false)
  }

  const handleLogout = async () => {
    if (logout !== undefined) {
      await logout()
      router.push('/')
    }
  }
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

    return <MuiLink onClick={handleLogout}>Logout</MuiLink>
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
