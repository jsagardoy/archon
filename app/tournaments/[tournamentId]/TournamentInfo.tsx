'use client'

import { Box, Button, Container, Typography } from '@mui/material'
import { Profile, Tournament } from '../../../database/database.types'
import React, { useEffect, useState } from 'react'

import OwnerAccessWrapper from '../../components/OwnerAccessWrapper'
import TournamentInfoTable from './TournamentInfoTable'
import getProfile from '../../../services/getProfile'
import getSymbolFromCurrency from 'currency-symbol-map'
import getTournamentInfo from '../../../services/getTournamentInfo'
import getTournamentPlayers from '../../../services/getTournamentPlayers'
import { useRouter } from 'next/navigation'

interface Props {
  tournamentId: string
}
const TournamentInfo = ({ tournamentId }: Props) => {
  const [tournament, setTournament] = useState<Tournament | null>(null)
  const [playersList, setPlayersList] = useState<Profile[]>([])
  const router = useRouter()

  const getTournamentInfoData = async () => {
    try {
      const newTournament: Tournament | null = await getTournamentInfo(
        tournamentId
      )
      if (!newTournament) {
        throw new Error(`Error. Not tournament found with Id: ${tournamentId}`)
      }
      setTournament(newTournament)
    } catch (error) {
      console.error(error)
    }
  }

  const getPlayersList = async () => {
    const players = await getTournamentPlayers(tournamentId)
    console.log({ players })
    if (players) {
      const playersInfo: (Profile | null)[] = await Promise.all(
        players.map(async (profile) => await getProfile(profile?.userId))
      )
      const notNullPlayers: Profile[] =
        playersInfo.map((elem: Profile | null) => elem as Profile) ?? []
      setPlayersList(notNullPlayers)
    }
  }

  const handleStartTournament = () => {
    router.push(`/tournaments/${tournamentId}/archon/round/1`)
  }

  useEffect(() => {
    getTournamentInfoData()
    getPlayersList()
  }, [tournamentId])

  const formattedDate = Intl.DateTimeFormat(navigator.language).format(
    tournament?.date.toDate()
  )
  return (
    <Container>
      <Typography variant="h6">Tournament Information</Typography>
      {tournament && (
        <Box>
          <Typography variant="body1">Name: {tournament.name}</Typography>
          <Typography variant="body1">Date: {formattedDate}</Typography>
          <Typography variant="body1">
            Starting time: {tournament.hour} Hrs
          </Typography>
          <Typography variant="body1">
            Available: {tournament.active ? 'Available' : 'Unavailable'}
          </Typography>
          <Typography variant="body1">
            Description: {tournament.description}
          </Typography>
          <Typography variant="body1">Details: {tournament.details}</Typography>
          <Typography variant="body1">
            Price: {tournament.price}
            {getSymbolFromCurrency(tournament.currency ?? 'EUR')}
          </Typography>
          <Typography variant="body1">
            Number of rounds (including final): {tournament.numberOfRounds}
          </Typography>
          <Typography variant="body1">
            Number of players: {playersList?.length ?? 0}/
            {tournament.maxNumberOfPlayers}
          </Typography>
          <Typography variant="body1">Country: {tournament.country}</Typography>
          <Typography variant="body1">State: {tournament.state}</Typography>
          <Typography variant="body1">City: {tournament.city}</Typography>
          <OwnerAccessWrapper tournamentId={tournament?.tournamentId}>
            <>
              <Button onClick={() => handleStartTournament()}>
                Start tournament
              </Button>
              <Typography variant="subtitle1">Player's list:</Typography>
              {playersList.length === 0 ? (
                <Typography variant="body1">No players subscribed</Typography>
              ) : (
                <TournamentInfoTable profiles={playersList} />
              )}
            </>
          </OwnerAccessWrapper>
        </Box>
      )}
    </Container>
  )
}

export default TournamentInfo
