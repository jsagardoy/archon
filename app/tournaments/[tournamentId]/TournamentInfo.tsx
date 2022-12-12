'use client'

import { Box, Container, Typography } from '@mui/material'
import { PlayerType, TournamentType } from '../../../utils/database.types'
import React, { useEffect, useState } from 'react'

import OwnerAccessWrapper from '../../components/OwnerAccessWrapper'
import TournamentInfoTable from './TournamentInfoTable'
import { UserProfile } from '../../../utils/types'
import getPlayerInfo from '../../../services/getPlayerInfo'
import getSymbolFromCurrency from 'currency-symbol-map'
import getTournamentPlayers from '../../../services/getTournamentPlayers'
import { supabase } from '../../../utils/supabase'

interface Props {
  tournamentId: string
}
const TournamentInfo = ({ tournamentId }: Props) => {
  const [tournament, setTournament] = useState<TournamentType | null>(null)
  const [playersList, setPlayersList] = useState<UserProfile[]>([])

  const getTournamentInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('tournament')
        .select('*')
        .eq('id', tournamentId)

      if (error) {
        throw error
      }
      if (data.length < 1) {
        throw 'Id not found'
      }

      setTournament(data[0] as TournamentType)
    } catch (error) {
      console.error(error)
    }
  }

  const getPlayersList = async () => {
    const players = await getTournamentPlayers(tournamentId)
    console.log({players})
    if (players) {
      const playersInfo: UserProfile[] = await Promise.all(
        players.map(async (profile) => await getPlayerInfo(profile?.userId ?? ''))
      )
      console.log(playersInfo.filter((elem) => elem.id !== ''))
      setPlayersList(playersInfo.filter((elem) => elem.id !== ''))
    }
  }
  useEffect(() => {
    getTournamentInfo()
    getPlayersList()
  }, [tournamentId])

  const formattedDate = new Date(tournament?.date ?? '')
  return (
    <Container>
      <Typography variant="h6">Tournament Information</Typography>
      {tournament && (
        <Box>
          <Typography variant="body1">Name: {tournament.name}</Typography>
          <Typography variant="body1">
            Date: {formattedDate.toLocaleDateString('es-ES')}
          </Typography>
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
            Number of rounds (including final): {tournament.number_of_rounds}
          </Typography>
          <Typography variant="body1">
            Number of players: {tournament.players?.length ?? 0}/
            {tournament.max_num_of_players}
          </Typography>
          <Typography variant="body1">Country: {tournament.country}</Typography>
          <Typography variant="body1">State: {tournament.state}</Typography>
          <Typography variant="body1">City: {tournament.city}</Typography>
          <OwnerAccessWrapper tournamentId={tournament?.id ?? ''}>
            <Typography variant="subtitle1">Player's list:</Typography>
            {playersList.length === 0 ? (
              <Typography variant="body1">No players subscribed</Typography>
            ) : (
                <TournamentInfoTable profiles={playersList} />
            )}
          </OwnerAccessWrapper>
        </Box>
      )}
    </Container>
  )
}

export default TournamentInfo
