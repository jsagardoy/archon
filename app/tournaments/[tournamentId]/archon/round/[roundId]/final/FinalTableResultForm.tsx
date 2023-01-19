'use client'

import React, { useEffect, useState } from 'react'

import { Container } from '@mui/material'
import FinalTableForm from './FinalTableForm'
import { PlayersTotalInfo } from '../../../../../../../utils/types'
import usePlayersList from '../../../../../../hooks/usePlayersList'

const FinalTableResultForm = () => {
  return (
    <Container>
      <span>Final Table</span>
      <FinalTableForm />
    </Container>
  )
}

export default FinalTableResultForm
