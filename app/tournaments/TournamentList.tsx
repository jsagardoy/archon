'use client'

import { AlertType, TournamentFilterValuesType } from '../../utils/types'
import {
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
import { Database, TournamentType } from '../../utils/database.types'
import React, { useEffect, useState } from 'react'

import DialogWrapper from '../components/DialogWrapper'
import PrinceAccess from '../components/PrinceAccess'
import TableFilter from './TableFilter'
import TablePaginationActions from '../components/TablePaginationActions'
import TournamentForm from './TournamentForm'
import { start } from 'repl'
import useSnackbar from '../hooks/useSnackbar'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

const TournamentList = () => {
  const supabase = useSupabaseClient<Database>()
  const { setAlert } = useSnackbar()
  const [tournaments, setTournaments] = useState<TournamentType[] | null>(null)
  const [filters, setFilters] = useState<TournamentFilterValuesType>(
    {} as TournamentFilterValuesType
  )
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const getData = async () => {
    try {
      const { data, error } = await supabase
        .from('tournament')
        .select('*')
        .eq('active', true)
      setTournaments(data as TournamentType[])
    } catch (error) {
      const alert: AlertType = {
        severity: 'error',
        open: true,
        message: 'Error while fetching data',
      }
      setAlert(alert)
      console.error(error)
    }
  }

  useEffect(() => {
    getData() //only active tournaments
  }, [supabase])

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
            <TableRow hover selected>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Players</TableCell>
              <TableCell>Actions</TableCell>
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
                ({
                  id,
                  name,
                  date,
                  country,
                  city,
                  max_num_of_players,
                  players,
                }) => (
                  <TableRow key={id} hover selected>
                    <TableCell>{name}</TableCell>
                    <TableCell>
                      {new Date(date ?? '').toLocaleDateString()}
                    </TableCell>
                    <TableCell>{country}</TableCell>
                    <TableCell>{city}</TableCell>
                    <TableCell>
                      {players?.length ?? 0}/{max_num_of_players}
                    </TableCell>
                    <TableCell>Suscribe</TableCell>
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
