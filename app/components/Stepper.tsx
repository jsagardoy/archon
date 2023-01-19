'use client'

import { AlertType, PlayersTotalInfo } from '../../utils/types'
import { Box, Button, Container } from '@mui/material'
import React, { ReactElement } from 'react'

import addRoundResults from '../../services/addRoundResults'
import addTournamentRanking from '../../services/addTournamentRanking'
import useMultistep from '../hooks/useMultistep'
import usePlayersList from '../hooks/usePlayersList'
import { useRouter } from 'next/navigation'
import useSnackbar from '../hooks/useSnackbar'

const Stepper = ({
  steps,
  tournamentId,
  roundId,
  isFinal,
}: {
  steps: ReactElement[]
  tournamentId: string
  roundId: string
  isFinal: boolean
}) => {
  const { currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistep(steps)
  const { playersList } = usePlayersList()
  const { setAlert } = useSnackbar()
  const router = useRouter()

  const composeFinalRanking = async () => {
    const listItem = window.sessionStorage.getItem('final')
    if (listItem) { 
      const list:PlayersTotalInfo[] = JSON.parse(listItem)
      const ranking = [...playersList, ...list.slice(5)]
      //TODO:Linsert in DB
      const resp = await addTournamentRanking(ranking, tournamentId)
      if (!resp) {
        console.error('Error adding tournament ranking to Database')
      }
    }
  }
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
    composeFinalRanking()
    router.push(
      `/tournaments/${tournamentId}/finalRanking`
    )
  }
  return (
    <Container>
      <Box>Round {roundId}</Box>
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
