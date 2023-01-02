'use client'

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import React, { ReactElement, cloneElement, useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import TournamentForm from '../tournaments/TournamentForm'

interface Props {
  label: string
  children: React.ReactNode
}
const DialogWrapper = ({ label, children }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const handleClose = () => setOpen(false)
  const handleButton = () => setOpen((prev) => !prev)

  return (
    <Box sx={{ display: 'flex', marginBottom: '0.5rem', marginTop: '0.5rem' }}>
      <Button onClick={handleButton} variant="outlined" startIcon={<AddIcon />}>
        {label}
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Create new tournament</DialogTitle>
        <DialogContent>
          {/*  {cloneElement(children as ReactElement, { handleClose: handleClose })} */}
          {children}
          {/*  <TournamentForm handleClose={handleClose} /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default DialogWrapper
