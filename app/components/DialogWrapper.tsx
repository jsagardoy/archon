'use client'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import React, { ReactElement, cloneElement, useState } from 'react'

import TournamentForm from '../tournaments/TournamentForm'

interface Props {
  label: string,
  children:React.ReactNode
}
const DialogWrapper = ({ label, children }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const handleClose = () => setOpen(false)
  const handleButton = () => setOpen((prev) => !prev)

  return (
    <>
      <Button onClick={handleButton}>{label}</Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Create new tournament</DialogTitle>
        <DialogContent>
        {cloneElement(children as ReactElement,{handleClose:handleClose})}
          <TournamentForm handleClose={handleClose} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DialogWrapper
