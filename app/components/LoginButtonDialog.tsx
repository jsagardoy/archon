import { Dialog } from '@mui/material'
import LoginForm from '../login/LoginForm'
import React from 'react'

interface Props {
  open: boolean
  onClose: () => void
}

const LoginButtonDialog = (props: Props) => {
  const { open, onClose } = props

    return <Dialog open={open} onClose={onClose}>
      <LoginForm />
  </Dialog>
}

export default LoginButtonDialog
