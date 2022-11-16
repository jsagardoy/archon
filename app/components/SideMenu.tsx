'use client'

import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu'

const SideMenu = () => {
  const [showDrawer, setShowDrawer] = useState<boolean>(false)
  const menuElements: string[] = ['Home', 'Tournaments', 'Login']
  const toogleDrawer = (): void => {
    setShowDrawer((prev) => !prev)
  }
  const handleClose = (): void => {
    setShowDrawer(false)
  }
  const menuList = () => (
    <Box>
      <List>
        {menuElements.map((elem) => (
          <ListItem key={elem} onClick={handleClose}>
            {elem === 'Home' ? (
              <Link href={`/`}>{elem}</Link>
            ) : (
              <Link href={`/${elem}`.toLocaleLowerCase()}>{elem}</Link>
            )}
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
