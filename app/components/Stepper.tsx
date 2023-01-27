'use client'

import { AlertType, PlayersTotalInfo } from '../../utils/types'
import { Box, Button, Container, Typography } from '@mui/material'
import React, { ReactElement } from 'react'

import addRoundResults from '../../services/addRoundResults'
import addTournamentRanking from '../../services/addTournamentRanking'
import getFinalRound from '../../services/getFinalRound'
import useMultistep from '../hooks/useMultistep'
import usePlayersList from '../hooks/usePlayersList'
import { useRouter } from 'next/navigation'
import useSnackbar from '../hooks/useSnackbar'

const Stepper = ({
  steps,
  tournamentId,
  roundId,
  allowNext,
}: {
  steps: ReactElement[]
  tournamentId: string
  roundId: string
  allowNext: boolean
}) => {
  const { currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistep(steps)
  const { playersList } = usePlayersList()
  const { setAlert } = useSnackbar()
  const router = useRouter()

  const composeFinalRanking = async () => {
    const listItem = window.sessionStorage.getItem('final')
    if (listItem) {
      const list: PlayersTotalInfo[] = JSON.parse(listItem)
      const ranking = [...playersList, ...list.slice(5)]
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
    router.push(`/tournaments/${tournamentId}/finalRanking`)
  }
  return (
    <Container sx={{ display: 'flex', width: '100%', flexDirection: 'column', maxHeight:'65vh', height:'55vh', alignItems:'center'}}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection:'row',marginTop:'1rem', width:'100%' }}>
        <Typography color="primary" variant="subtitle1">
          Round {roundId}
        </Typography>
      <Typography color='primary' variant='body1'>
        {currentStepIndex + 1}/{steps.length}
      </Typography>
      </Box>
      <Box sx={{width:'100%'}}>{step}</Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
      >
        {!isFirstStep() ? <Button onClick={back}>Back</Button> : <Box></Box>}
        <Button disabled={!allowNext} onClick={() => handleNext()}>
          {isLastStep() ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </Container>
  )
}

export default Stepper
