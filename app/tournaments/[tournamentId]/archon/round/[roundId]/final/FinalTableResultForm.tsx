'use client'

import { Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import FinalTableForm from './FinalTableForm'
import { PlayersTotalInfo } from '../../../../../../../utils/types'
import usePlayersList from '../../../../../../hooks/usePlayersList'

interface Props {
  updateNext: (value: boolean) => void
}
const FinalTableResultForm = ({ updateNext }: Props) => {
  return (
    <Container
      sx={{
        display: 'flex',
        height: '65vh',
        flexDirection: 'column',
        alignItems: 'center',
        width:'100%',
      }}
    >
      <Typography sx={{m:'1rem'}} color="primary" variant='h5'>Final table results</Typography>
      <FinalTableForm updateNext={updateNext} />
    </Container>
  )
}

export default FinalTableResultForm
