'use client'

import { Box, Container, Link, Typography } from '@mui/material'

import React from 'react'
import { darkViolet } from '../componentStyles/colors'

const Footer = () => {
  return (
    <Container
      sx={{
        backgroundColor: darkViolet,
        minWidth: '100%',
        height: '10%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        position: 'fixed',
        bottom: '0',
        width: '100%',
      }}
    >
      <Box sx={{ marginTop: '1rem' }}>
        <Typography color="secondary" variant="subtitle1">
          Author: Jehú Sagardoy Martín
        </Typography>
        <Typography color="secondary" variant="subtitle1">
          Contact:
          <Link sx={{ marginLeft: '0.5rem' }} href="info@test.com">
            info@test.com
          </Link>
        </Typography>
      </Box>
    </Container>
  )
}

export default Footer
