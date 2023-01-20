'use client'

import React, { useEffect, useState } from 'react'

import { Container } from '@mui/material'
import FinalTableForm from './FinalTableForm'
import { PlayersTotalInfo } from '../../../../../../../utils/types'
import usePlayersList from '../../../../../../hooks/usePlayersList'

interface Props{
 updateNext:(value:boolean)=>void 
}
const FinalTableResultForm = ({updateNext}:Props) => {
  return (
    <Container>
      <span>Final Table</span>
      <FinalTableForm updateNext={updateNext}/>
    </Container>
  )
}

export default FinalTableResultForm
