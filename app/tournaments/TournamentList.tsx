'use client'

import {
  AlertType,
  PlayersList,
  TournamentFilterValuesType,
} from '../../utils/types'
import {
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
import {
  Database,
  PlayerType,
  TournamentType,
} from '../../utils/database.types'
import React, { useEffect, useState } from 'react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

import DialogWrapper from '../components/DialogWrapper'
import PrinceAccess from '../components/PrinceAccess'
import TableFilter from './TableFilter'
import TablePaginationActions from '../components/TablePaginationActions'
import TournamentForm from './TournamentForm'
import addPlayerToTournament from '../../services/addPlayerToTournament'
import getTournamentInfo from '../../services/getTournamentInfo'
import getTournamentPlayers from '../../services/getTournamentPlayers'
import getTournamentsData from '../../services/getTournamentsData'
import { isAlreadySubscribed } from '../../utils/funtions'
import removePlayerFromTournament from '../../services/removePlayerFromTournament'
import { useRouter } from 'next/navigation'
import useSnackbar from '../hooks/useSnackbar'

const TournamentList = () => {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const router = useRouter()
  const { setAlert } = useSnackbar()

  const [playersList, setlist] = useState<PlayersList[]>([])
  const [tournaments, setTournaments] = useState<TournamentType[]>([])

  const [filters, setFilters] = useState<TournamentFilterValuesType>(
    {} as TournamentFilterValuesType
  )
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const getData = async () => {
    const tournamentsData = await getTournamentsData() //only active tournaments
    if (tournamentsData) {
      setTournaments(tournamentsData)
      const tournamentsId: string[] = tournamentsData.map(
        (t: TournamentType) => t.id
      )

      const newValue: { tournamentId: string; players: PlayerType[] }[] =
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
  }

  useEffect(() => {
    getData()
  }, [supabase, playersList])

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const calculateRows = () =>
    rowsPerPage > 0
      ? tournaments?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : tournaments

  const isDateInBetweenDates = (
    startDate: string,
    endDate: string,
    compare: string
  ) => {
    const formatedDate = new Date(compare)
    formatedDate.setHours(23, 59, 59)
    const start = new Date(startDate)
    start.setHours(parseInt('00', 8), parseInt('00', 8), parseInt('00', 8))
    const end = new Date(endDate)
    start.setHours(23, 59, 59)
    return (
      formatedDate.getTime() >= start.getTime() &&
      formatedDate.getTime() <= end.getTime()
    )
  }

  const handleFilters = (appliedFilters: TournamentFilterValuesType) => {
    setFilters(appliedFilters)
  }

  const applyFilters = (list: TournamentType[]): TournamentType[] => {
    return (
      list
        ?.filter((elem) =>
          filters.country ? elem.country === filters.country : elem
        )
        .filter((elem) => (filters.state ? elem.state === filters.state : elem))
        .filter((elem) => (filters.city ? elem.city === filters.city : elem))
        .filter((elem) => elem.active ?? false)
        .filter((elem) => {
          if (elem) {
            if (elem.date && filters.startDate && filters.endDate) {
              return isDateInBetweenDates(
                filters.startDate,
                filters.endDate,
                elem.date
              )
            }
          }
          return elem
        }) ?? ([] as TournamentType[])
    )
  }

  const handleSubscribe = async (id: string) => {
    try {
      const playerId = user?.id ?? ''
      const tournamentId = id
      const response = await addPlayerToTournament(
        tournamentId,
        playerId,
        playersList
      )
      const newAlert: AlertType = {
        message: 'User subscribed',
        severity: 'success',
        open:true
      }
      setAlert(newAlert)
    } catch (error) {
      const newAlert: AlertType = {
        message: JSON.stringify(error),
        severity: 'error',
        open: true,
      }
      setAlert(newAlert)
      error
    }
  }

  const handleShowInfo = async (id: string) => {
    router.push(`/tournaments/${id}`)
  }

  const getSubscribed = (tournamentId: string): number => {
    const elem = playersList?.find((elem) => elem.tournamentId === tournamentId)
    return elem ? elem.players.length : 0
  }
  const handleUnsubscribe = async (id: string) => {
    try {
      const playerId = user?.id ?? ''
      const tournamentId = id
      if (isAlreadySubscribed(tournamentId, playersList, playerId)) {
        const response = await removePlayerFromTournament(
          tournamentId,
          playerId
        )
        const newAlert: AlertType = {
          message: 'User unsubscribed',
          severity: 'success',
          open: true,
        }
        setAlert(newAlert)
      }
    } catch (error) {
      const newAlert: AlertType = {
        message: JSON.stringify(error),
        severity: 'error',
        open: true,
      }
      setAlert(newAlert)
    }
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow hover selected sx={{ borderBottom: '1px solid black' }}>
              <TableCell sx={{ backgroundColor: 'darkgrey' }}>Name</TableCell>
              <TableCell sx={{ backgroundColor: 'darkgrey' }}>Date</TableCell>
              <TableCell sx={{ backgroundColor: 'darkgrey' }}>
                Country
              </TableCell>
              <TableCell sx={{ backgroundColor: 'darkgrey' }}>City</TableCell>
              <TableCell sx={{ backgroundColor: 'darkgrey' }}>
                Players
              </TableCell>
              <TableCell sx={{ backgroundColor: 'darkgrey' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applyFilters(calculateRows() ?? [])?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>No tournaments</TableCell>
              </TableRow>
            ) : (
              applyFilters(
                calculateRows()?.sort((a, b) =>
                  a && b && a.date && b.date ? a.date.localeCompare(b.date) : 1
                ) ?? []
              )?.map(
                ({ id, name, date, country, city, max_num_of_players }) =>
                  id && (
                    <TableRow key={id} hover selected>
                      <TableCell onClick={() => handleShowInfo(id)}>
                        {name}
                      </TableCell>
                      <TableCell onClick={() => handleShowInfo(id)}>
                        {new Date(date ?? '').toLocaleDateString()}
                      </TableCell>
                      <TableCell onClick={() => handleShowInfo(id)}>
                        {country}
                      </TableCell>
                      <TableCell>{city}</TableCell>
                      <TableCell onClick={() => handleShowInfo(id)}>
                        {getSubscribed(id) ?? 0}/{max_num_of_players}
                      </TableCell>
                      <TableCell>
                        {isAlreadySubscribed(
                          id,
                          playersList,
                          user?.id ?? ''
                        ) ? (
                          <Button onClick={() => handleUnsubscribe(id)}>
                            Unsubscribe
                          </Button>
                        ) : (
                          <Button onClick={() => handleSubscribe(id)}>
                            Subscribe
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  )
              )
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={6}
                count={tournaments?.length ?? 0}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default TournamentList
