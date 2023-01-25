'use client'

import { Box, Typography } from '@mui/material'

import LoginButton from './LoginButton'
import React from 'react'
import SideMenu from './SideMenu'
import styles from '../componentStyles/Header.module.css'

const Header = () => {
  return (
    <Box sx={{ padding: '0px' }} className={styles.loginContainer}>
      <SideMenu />
      <Typography variant="h2" color='secondary'>Archon</Typography>
      <LoginButton />
    </Box>
  )
}

export default Header
