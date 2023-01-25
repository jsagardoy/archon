'use client'

import '../componentStyles/sideMenu.css'

import {
  Avatar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Link as MuiLink,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { darkViolet, lightViolet, violet } from '../componentStyles/colors'

import Box from '@mui/material/Box'
import { DEFAULT_USER_URL } from '../../utils/funtions'
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu'
import { User } from 'firebase/auth'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/navigation'
import useSession from '../hooks/useSession'

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
      return (
        <Link className="linkItems" href={`/`}>
          {elem}
        </Link>
      )
    }
    if (!user) {
      return (
        <Link className="linkItems" href={`/${elem}`.toLocaleLowerCase()}>
          {elem}
        </Link>
      )
    }
    if (user && elem.toLocaleLowerCase() !== 'login') {
      return (
        <Link className="linkItems" href={`/${elem}`.toLocaleLowerCase()}>
          {elem}
        </Link>
      )
    }

    return (
      <MuiLink className="linkItems" onClick={handleLogout}>
        Logout
      </MuiLink>
    )
  }
  useEffect(() => {
    setActiveUser(user)
    return () => {
      setActiveUser(null)
    }
  }, [user])

  const menuList = () => (
    <Box sx={{ width: '20rem', height: '100%', overflow: 'hidden' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: lightViolet,
          height: '30%',
          marginTop: '0px',
          marginBottom: '0px',
          borderBottom: '3px solid white',
        }}
      >
        <img
          className="avatarMenu"
          alt="User picture"
          src={user?.photoURL ?? DEFAULT_USER_URL}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: '70%',
          width: '100%',
          marginTop: '0px',
          marginBottom: '0px',
          backgroundColor: darkViolet,
        }}
      >
        <List
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItem: 'center',
            flexDirection: 'column',
            width: '100%',
            marginLeft: '0px',
            marginRight: '0px',
          }}
        >
          {menuElements.map((elem) => (
            <ListItem
              sx={{
                display: 'flex',
                textAlign: 'center',
                width: '100%',
                paddingLeft: '0px',
                paddingRight: '0px',
              }}
              key={elem}
              onClick={handleClose}
            >
              {handleListOfElements(elem)}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )

  return (
    <>
      <IconButton onClick={toogleDrawer}>
        <MenuIcon fontSize='large' color='secondary'/>
      </IconButton>
      <Drawer anchor="left" open={showDrawer} onClose={handleClose}>
        {menuList()}
      </Drawer>
    </>
  )
}

export default SideMenu
