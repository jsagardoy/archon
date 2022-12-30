import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TableFooter,
  TablePagination,
  TableContainer,
} from '@mui/material'
import { User } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Tournament } from '../../database/database.types'
import addPlayerToTournament from '../../services/addPlayerToTournament'
import removePlayerFromTournament from '../../services/removePlayerFromTournament'
import { isAlreadySubscribed } from '../../utils/funtions'
import {
  AlertType,
  PlayersList,
  TournamentFilterValuesType,
} from '../../utils/types'
import TablePaginationActions from '../components/TablePaginationActions'
import { useAuth } from '../hooks/useAuth'
import useSession from '../hooks/useSession'
import useSnackbar from '../hooks/useSnackbar'
import page from '../page'

const TournamentsTable = ({
  tournaments,
  filters,
  playersList,
}: {
  tournaments: Tournament[]
  filters: TournamentFilterValuesType
  playersList: PlayersList[]
}) => {
  const router = useRouter()
  const { setAlert } = useSnackbar()
  const { session } = useSession()
  const user = session ? session : null
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

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
  const applyFilters = (list: Tournament[]): Tournament[] => {
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
                String(elem.date)
              )
            }
          }
          return elem
        }) ?? ([] as Tournament[])
    )
  }

  const handleSubscribe = async (id: string) => {
    try {
      const playerId = user?.uid ?? ''
      const tournamentId = id
      const response = await addPlayerToTournament(
        tournamentId,
        playerId,
        playersList
      )
      const newAlert: AlertType = {
        message: 'User subscribed',
        severity: 'success',
        open: true,
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
      const playerId = user?.uid ?? ''
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
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow hover selected sx={{ borderBottom: '1px solid black' }}>
            <TableCell sx={{ backgroundColor: 'darkgrey' }}>Name</TableCell>
            <TableCell sx={{ backgroundColor: 'darkgrey' }}>Date</TableCell>
            <TableCell sx={{ backgroundColor: 'darkgrey' }}>Country</TableCell>
            <TableCell sx={{ backgroundColor: 'darkgrey' }}>City</TableCell>
            <TableCell sx={{ backgroundColor: 'darkgrey' }}>Players</TableCell>
            <TableCell sx={{ backgroundColor: 'darkgrey' }}>Actions</TableCell>
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
                a && b && a.date && b.date
                  ? a.date.toString().localeCompare(b.date.toString())
                  : 1
              ) ?? []
            )?.map(
              ({
                tournamentId,
                name,
                date,
                country,
                city,
                maxNumberOfPlayers,
              }) =>
                tournamentId && (
                  <TableRow key={tournamentId} hover selected>
                    <TableCell onClick={() => handleShowInfo(tournamentId)}>
                      {name}
                    </TableCell>
                    <TableCell onClick={() => handleShowInfo(tournamentId)}>
                      {new Date(date ?? '').toLocaleDateString()}
                    </TableCell>
                    <TableCell onClick={() => handleShowInfo(tournamentId)}>
                      {country}
                    </TableCell>
                    <TableCell>{city}</TableCell>
                    <TableCell onClick={() => handleShowInfo(tournamentId)}>
                      {getSubscribed(tournamentId) ?? 0}/{maxNumberOfPlayers}
                    </TableCell>
                    <TableCell>
                      {isAlreadySubscribed(
                        tournamentId,
                        playersList,
                        user?.uid ?? ''
                      ) ? (
                        <Button onClick={() => handleUnsubscribe(tournamentId)}>
                          Unsubscribe
                        </Button>
                      ) : (
                        <Button onClick={() => handleSubscribe(tournamentId)}>
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
  )
}

export default TournamentsTable
