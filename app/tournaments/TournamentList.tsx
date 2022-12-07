'use client'

import { AlertType, TournamentFilterValuesType } from '../../utils/types'
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
import getTournamentPlayers from '../../services/getTournamentPlayers'
import getTournamentsData from '../../services/getTournamentsData'
import { useRouter } from 'next/navigation'

const TournamentList = () => {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const router = useRouter()

  const [playersList, setPlayerList] = useState<
    { id: string; subscribed: number }[] | null
  >(null)
  const [tournaments, setTournaments] = useState<TournamentType[] | null>(null)

  const [filters, setFilters] = useState<TournamentFilterValuesType>(
    {} as TournamentFilterValuesType
  )
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const getData = async () => {
    const tournamentsData = await getTournamentsData() //only active tournaments
    if (tournamentsData) {
      setTournaments(tournamentsData)
      const tournamentsId: string[] = tournamentsData.map((t:TournamentType) => t.id)
      const newValue = await Promise.all(tournamentsId.map(id => getTournamentPlayers(id)))
      const newData:{id:string, subscribed:number}[] = tournamentsId.map((t,index)=>({id:t, subscribed:newValue[index]?.length??0}))  
      setPlayerList(newData)
    }
    
  }
  
  useEffect(() => {
    getData()
  }, [supabase,playersList])

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

  const getTournamentInfo = async (tournamentId: string) => {
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

      return data[0] as TournamentType
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const addPlayerToTournament = async (
    tournamentId: string,
    userId: string
  ) => {
    //TODO: add snackbar
    //TODO: control user duplication
    const tournament = await getTournamentInfo(tournamentId)
    if (tournament) {
      try {
        const { data, error } = await supabase
          .from('players')
          .insert([{ id_tournament: tournamentId, ranking: 0, userId: userId }])
        if (error) {
          throw error
        }
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    }
  }

  const handleSubscribe = async (id: string) => {
    try {
      const playerId = user?.id ?? ''
      const tournamentId = id

      const response = await addPlayerToTournament(tournamentId, playerId)
      console.log('added user ' + response)
    } catch (error) {
      error
    }
  }

  const handleShowInfo = async (id: string) => {
    router.push(`/tournaments/${id}`)
  }

  const getSubscribed = (tournamentId:string):number => {
    const elem = playersList?.find(elem => elem.id === tournamentId)
    return elem?elem.subscribed:0
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
                        <Button onClick={() => handleSubscribe(id)}>
                          Subscribe
                        </Button>
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
