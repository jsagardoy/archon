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

  const handleSeeResults = () => {
    router.push(`/tournaments/${tournamentId}/finalRanking`)
  }

  useEffect(() => {
    getTournamentInfoData()
    getPlayersList()
  }, [tournamentId])

  const formattedDate = Intl.DateTimeFormat(navigator.language).format(
    tournament?.date.toDate()
  )
  return (
    <>
      <Typography
        sx={{ textAlign: 'center', marginBottom: '1rem', marginTop: '0.5rem' }}
        color="primary"
        variant="h5"
      >
        Tournament details
      </Typography>
      <Container
        id="tournamentInfoContainer"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
          alignItems: 'center',
          overflow: 'scroll',
          gap: '0.5rem',
        }}
      >
        {tournament && (
          <>
            <Box
              id="dataInfo"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
                height: '65vh',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '0.5rem',
                }}
              >
                <Typography
                  sx={{ textDecoration: 'underline' }}
                  color="primary"
                  variant="h6"
                >
                  Tournament information
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                <Typography color="primary" variant="body1">
                  Name:
                </Typography>
                <Typography variant="body1">{tournament.name}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                <Typography color="primary" variant="body1">
                  Date:
                </Typography>
                <Typography variant="body1">{formattedDate}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                <Typography color="primary" variant="body1">
                  Tournament Type:
                </Typography>
                <Typography variant="body1">
                  {tournament.tournamentType}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                <Typography color="primary" variant="body1">
                  Starting time:
                </Typography>
                <Typography variant="body1">{tournament.hour} Hrs</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                <Typography color="primary" variant="body1">
                  Available:
                </Typography>
                <Typography variant="body1">
                  {tournament.active ? 'Available' : 'Unavailable'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                <Typography color="primary" variant="body1">
                  Description:
                </Typography>
                <Typography variant="body1">
                  {tournament.description}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                <Typography color="primary" variant="body1">
                  Details:
                </Typography>
                <Typography variant="body1">{tournament.details}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                <Typography color="primary" variant="body1">
                  Price:
                </Typography>
                <Typography variant="body1">
                  {tournament.price}
                  {getSymbolFromCurrency(tournament.currency ?? 'EUR')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                <Typography color="primary" variant="body1">
                  Number of rounds (including final):
                </Typography>
                <Typography variant="body1">
                  {tournament.numberOfRounds}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                <Typography color="primary" variant="body1">
                  Number of players:
                </Typography>
                <Typography variant="body1">
                  {playersList?.length ?? 0}/{tournament.maxNumberOfPlayers}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                <Typography color="primary" variant="body1">
                  Country:
                </Typography>
                <Typography variant="body1">{tournament.country}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                <Typography color="primary" variant="body1">
                  State:
                </Typography>
                <Typography variant="body1">{tournament.state}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                <Typography color="primary" variant="body1">
                  City:{' '}
                </Typography>{' '}
                <Typography variant="body1">{tournament.city}</Typography>{' '}
              </Box>
              <Button
                sx={{ marginTop: '2rem', border: '1px solid' }}
                disabled={!tournament.active}
                onClick={() => handleSeeResults()}
              >
                See results
              </Button>
              <OwnerAccessWrapper tournamentId={tournament?.tournamentId}>
                <>
                  {/* disabled buttom if tournament not active */}
                  <Button
                    sx={{
                      marginTop: '2rem',
                      marginBottom: '2rem',
                      border: '1px solid',
                    }}
                    disabled={!tournament.active}
                    onClick={() => handleStartTournament()}
                  >
                    Start tournament
                  </Button>
                </>
              </OwnerAccessWrapper>
            </Box>

            <Box
              id="players list"
              sx={{
                display: 'flex',
                flexDirection: 'column',

                width: '100%',
                height: '65vh',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '65vh',
                }}
              >
                <Typography
                  sx={{ textDecoration: 'underline' }}
                  color="primary"
                  variant="h6"
                >
                  Player's list:
                </Typography>
                {playersList.length === 0 ? (
                  <Typography variant="body1">No players subscribed</Typography>
                ) : (
                  <TournamentInfoTable profiles={playersList} />
                )}
              </Box>
            </Box>
          </>
        )}
      </Container>
    </>
  )
}

export default TournamentInfo
