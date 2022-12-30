'use client'

import {
  AlertType,
  PlayersList,
  TournamentFilterValuesType,
} from '../../utils/types'
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import { Player, Tournament } from '../../database/database.types'
import React, { useEffect, useState } from 'react'

import DialogWrapper from '../components/DialogWrapper'
import PrinceAccess from '../components/PrinceAccess'
import TableFilter from './TableFilter'
import TablePaginationActions from '../components/TablePaginationActions'
import TournamentForm from './TournamentForm'
import addPlayerToTournament from '../../services/addPlayerToTournament'
import getTournamentPlayers from '../../services/getTournamentPlayers'
import getTournamentsData from '../../services/getTournamentsData'
import { isAlreadySubscribed } from '../../utils/funtions'
import removePlayerFromTournament from '../../services/removePlayerFromTournament'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/navigation'
import useSnackbar from '../hooks/useSnackbar'
import useSession from '../hooks/useSession'
import TournamentsTable from './TournamentsTable'

const TournamentList = () => {
  const { session } = useSession()
  const user = session ?? null

  const [playersList, setlist] = useState<PlayersList[]>([])
  const [tournaments, setTournaments] = useState<Tournament[]>([])

  const [filters, setFilters] = useState<TournamentFilterValuesType>(
    {} as TournamentFilterValuesType
  )

  const getData = async () => {
    try {
      const tournamentsData = await getTournamentsData() //only active tournaments
      if (tournamentsData) {
        setTournaments(tournamentsData)
        const tournamentsId: string[] = tournamentsData
          .map((t: Tournament) => {
            if (t !== null) {
              return t.tournamentId
            }
          })
          .filter((elem) => elem !== null) as string[]

        const newValue: { tournamentId: string; players: Player[] }[] =
          await Promise.all(
            tournamentsId.map(async (id) => {
              return {
                tournamentId: id,
                players: (await getTournamentPlayers(id)) ?? [],
              }
            })
          )
        setlist(newValue)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getData()
  }, [playersList])

  const handleFilters = (appliedFilters: TournamentFilterValuesType) => {
    setFilters(appliedFilters)
  }

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4">Tournaments</Typography>
      <PrinceAccess>
        <DialogWrapper label="Create Tournament">
          <TournamentForm handleClose={() => {}} />
        </DialogWrapper>
      </PrinceAccess>
      <TableFilter filterValues={handleFilters} />
      <TournamentsTable
        tournaments={tournaments}
        filters={filters}
        playersList={playersList}
      />
    </Container>
  )
}

export default TournamentList
