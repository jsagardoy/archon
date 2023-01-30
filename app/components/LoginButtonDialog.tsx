import { Box, Dialog } from '@mui/material'

import LoginForm from '../login/LoginForm'
import React from 'react'

interface Props {
  open: boolean
  onClose: () => void
}

const LoginButtonDialog = (props: Props) => {
  const { open, onClose } = props

  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={{width:'30em', height:'fit-content', marginTop:'1rem', marginBottom:'1rem'}}>
        <LoginForm handleClose={onClose} />
      </Box>
    </Dialog>
  )
}

export default LoginButtonDialog
