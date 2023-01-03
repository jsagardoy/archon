'use client'

import {
  AlertType,
  PlayersList,
  TournamentFilterValuesType,
} from '../../../utils/types'
import { Button, TableBody, TableCell, TableRow } from '@mui/material'
import { Player, Tournament } from '../../../database/database.types'
import React, { useEffect, useState } from 'react'
import {
  isAlreadySubscribed,
  isDateInBetweenDates,
} from '../../../utils/funtions'

import { Timestamp } from 'firebase/firestore'
import addPlayerToTournament from '../../../services/addPlayerToTournament'
import getTournamentPlayers from '../../../services/getTournamentPlayers'
import removePlayerFromTournament from '../../../services/removePlayerFromTournament'
import { useRouter } from 'next/navigation'
import useSession from '../../hooks/useSession'
import useSnackbar from '../../hooks/useSnackbar'

const TournamentTableBody = ({
  filters,
  playersList,
  updatePlayers,
  rows,
}: {
  filters: TournamentFilterValuesType
  playersList: PlayersList[]
  updatePlayers: (newPlayersList: PlayersList[]) => void
  rows: Tournament[]
}) => {
  const { setAlert } = useSnackbar()
  const router = useRouter()
  const { session } = useSession()
  const user = session ? session : null

  const handleSubscribe = async (id: string) => {
    try {
      const playerId = user?.uid ?? ''
      const tournamentId = id
      const response = await addPlayerToTournament(
        tournamentId,
        playerId,
        playersList
      )
      if (!response) {
        throw new Error('Error susbscribing user')
      }
      if (response) {
        const newPlayers: Player[] = (await getTournamentPlayers(id)) ?? []
        const index = playersList.findIndex(
          (elem) => elem.tournamentId === tournamentId
        )
        if (index !== -1) {
          const newPlayersList = playersList.splice(index, 1, {
            tournamentId: tournamentId,
            players: [...newPlayers],
          })
          updatePlayers(newPlayersList)

          const newAlert: AlertType = {
            message: 'User subscribed',
            severity: 'success',
            open: true,
          }
          setAlert(newAlert)
        }
      }
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

  const handleUnsubscribe = async (id: string) => {
    try {
      const playerId = user?.uid ?? ''
      const tournamentId = id
      if (isAlreadySubscribed(tournamentId, playersList, playerId)) {
        const response = await removePlayerFromTournament(
          tournamentId,
          playerId
        )
        if (!response) {
          throw new Error('Error deleting player from tournament')
        }
        if (response) {
          const index = playersList.findIndex(
            (elem) => elem.tournamentId === tournamentId && elem
          )
          if (index !== -1) {
            const newPlayers: PlayersList = playersList[index]
            const playerIndex = newPlayers.players.findIndex(
              (elem) =>
                elem.tournamentId === tournamentId && elem.userId === user?.uid
            )
            if (playerIndex === -1) {
              throw new Error('Error. User is alredy unsubscribed')
            }

            const newPlayersList = newPlayers.players.splice(playerIndex, 1)

            const updatePlayerList = [
              ...playersList.splice(index, 1, {
                tournamentId: tournamentId,
                players: newPlayersList,
              }),
            ]

            updatePlayers(updatePlayerList)

            const newAlert: AlertType = {
              message: 'User unsubscribed',
              severity: 'success',
              open: true,
            }
            setAlert(newAlert)
          }
        }
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

  const getSubscribed = (tournamentId: string): number => {
    const elem = playersList?.find((elem) => elem.tournamentId === tournamentId)
    return elem ? elem.players.length : 0
  }

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

  return (
    <TableBody>
      {applyFilters(rows ?? [])?.length === 0 ? (
        <TableRow>
          <TableCell colSpan={6}>No tournaments</TableCell>
        </TableRow>
      ) : (
        applyFilters(
          rows?.sort((a, b) =>
            a && b && a.date && b.date
              ? a.date.toString().localeCompare(b.date.toString())
              : 1
          ) ?? []
        )?.map(
          ({ tournamentId, name, date, country, city, maxNumberOfPlayers }) =>
            tournamentId && (
              <TableRow key={tournamentId} hover selected>
                <TableCell onClick={() => handleShowInfo(tournamentId)}>
                  {name}
                </TableCell>
                <TableCell onClick={() => handleShowInfo(tournamentId)}>
                   {Intl.DateTimeFormat('es-ES').format(date.toDate())} 
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
  )
}

export default TournamentTableBody
