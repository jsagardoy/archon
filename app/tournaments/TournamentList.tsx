'use client'

import {
  AlertType,
  PlayersList,
  TournamentFilterValuesType,
} from '../../utils/types'
import { Container, Typography } from '@mui/material'
import { Player, Tournament } from '../../database/database.types'
import React, { useEffect, useState } from 'react'

import DialogWrapper from '../components/DialogWrapper'
import PrinceAccess from '../components/PrinceAccess'
import TableFilter from './TableFilter'
import TournamentForm from './TournamentForm'
import TournamentsTable from './table/TournamentsTable'
import getTournamentPlayers from '../../services/getTournamentPlayers'
import getTournamentsData from '../../services/getTournamentsData'

const TournamentList = () => {
  const [playersList, setPlayersList] = useState<PlayersList[]>([])
  const [tournaments, setTournaments] = useState<Tournament[]>([])

  const [filters, setFilters] = useState<TournamentFilterValuesType>(
    {} as TournamentFilterValuesType
  )

  const getData = async () => {
    try {
      const tournamentsData = await getTournamentsData() //only active tournaments
      if (tournamentsData?.filter((elem) => elem.tournamentId)) {
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
        setPlayersList(newValue)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdatePlayersList = (newPlayersList: PlayersList[]) => {
    setPlayersList(newPlayersList)
  }

  useEffect(() => {
    getData()
  }, [playersList.length])

  const handleFilters = (appliedFilters: TournamentFilterValuesType) => {
    setFilters(appliedFilters)
  }

  const handleClose = () => {}

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
          <TournamentForm handleClose={handleClose} />
        </DialogWrapper>
      </PrinceAccess>
      <TableFilter filterValues={handleFilters} />
      <TournamentsTable
        tournaments={tournaments}
        filters={filters}
        playersList={playersList}
        updatePlayers={handleUpdatePlayersList}
      />
    </Container>
  )
}

export default TournamentList
