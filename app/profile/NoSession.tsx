import { Box, Container, Typography } from '@mui/material'

import Link from 'next/link'
import React from 'react'

const NoSession = () => {
  return (
    <Container>
      <Box>
        <Typography variant="body1">
          No user logged. Please <Link href="/login">Log in</Link>
        </Typography>
      </Box>
    </Container>
  )
}

export default NoSession
