'use client'

import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Database, TournamentType } from '../../utils/database.types'
import React, { useEffect, useState } from 'react'

import { AlertType } from '../../utils/types'
import { database } from 'firebase-admin'
import useSnackbar from '../hooks/useSnackbar'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

const TournamentList = () => {
  const supabase = useSupabaseClient<Database>()
  const { setAlert } = useSnackbar()
  const [tournaments, setTournaments] = useState<TournamentType[] | null>(null)

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
    getData()
  }, [supabase])

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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Players</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tournaments?.length === 0 ? (
              <TableRow>
                <TableCell>No tournaments</TableCell>
              </TableRow>
            ) : (
              tournaments?.map(
                ({
                  id,
                  name,
                  date,
                  country,
                  city,
                  max_numb_of_players,
                  players,
                }) => (
                  <TableRow key={id} hover selected>
                    <TableCell>{name}</TableCell>
                    <TableCell>{date}</TableCell>
                    <TableCell>{country}</TableCell>
                    <TableCell>{city}</TableCell>
                    <TableCell>
                      {players?.length??0}/{max_numb_of_players}
                    </TableCell>
                    <TableCell>Suscribe</TableCell>
                  </TableRow>
                )
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default TournamentList
