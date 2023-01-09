'use client'

import { Box, Button, Container } from '@mui/material'
import React, { ReactElement } from 'react'

import useMultistep from '../hooks/useMultistep'

const Stepper = ({ steps }: { steps: ReactElement[] }) => {
  const { currentStepIndex, step, isFirstStep, isLastStep, back, next } =
      useMultistep(steps)
    const handleNext = () => {
        if (!isLastStep()) { return next() }
        alert('Done')
    }
  return (
    <Container>
      <Box>
        {currentStepIndex + 1}/{steps.length}
      </Box>
      <Box>{step}</Box>
      <Box sx={{display:'flex', justifyContent:'space-between',width:'100%'}}>
        {!isFirstStep() && <Button onClick={back}>Back</Button>}
        <Button onClick={()=>handleNext()}>{isLastStep() ? 'Finish' : 'Next'}</Button>
      </Box>
    </Container>
  )
}

export default Stepper
