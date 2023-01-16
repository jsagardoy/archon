'use client'

import { Box, Button, Container } from '@mui/material'
import React, { ReactElement } from 'react'

import { AlertType } from '../../utils/types'
import addRoundResults from '../../services/addRoundResults'
import useMultistep from '../hooks/useMultistep'
import usePlayersList from '../hooks/usePlayersList'
import useSnackbar from '../hooks/useSnackbar'

const Stepper = ({
  steps,
  tournamentId,
  roundId,
}: {
  steps: ReactElement[]
  tournamentId: string
  roundId: string
}) => {
  const { currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistep(steps)
  const { playersList } = usePlayersList()
  const { setAlert } = useSnackbar()
  const handleNext = async () => {
    if (!isLastStep()) {
      return next()
    }
    const resp = await addRoundResults(playersList, tournamentId, roundId)

    const newAlert: AlertType = resp
      ? {
          open: true,
          message: 'Round results successfully added',
          severity: 'success',
        }
      : {
          open: true,
          message: 'Error inserting round results',
          severity: 'error',
        }
    setAlert(newAlert)
    //TODO move to next url for next rounf
  }
  return (
    <Container>
      <Box>
        {currentStepIndex + 1}/{steps.length}
      </Box>
      <Box>{step}</Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
      >
        {!isFirstStep() && <Button onClick={back}>Back</Button>}
        <Button onClick={() => handleNext()}>
          {isLastStep() ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </Container>
  )
}

export default Stepper
