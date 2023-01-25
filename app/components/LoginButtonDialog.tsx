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
      <Box sx={{width:'20em', height:'21em', marginTop:'2em'}}>
        <LoginForm handleClose={onClose} />
      </Box>
    </Dialog>
  )
}

export default LoginButtonDialog
