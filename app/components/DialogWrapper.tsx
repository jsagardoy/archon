'use client'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { useState } from 'react'

interface Props {
  children: React.ReactNode
  label: string
}
const DialogWrapper = ({ children, label }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const handleClose = () => setOpen(false)
  const handleButton = () => setOpen((prev) => !prev)
  return (
    <>
      <Button onClick={handleButton}>{label}</Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Create new tournament</DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DialogWrapper
