'use client'

import { AlertType, PlayersTotalInfo } from '../../../../../../utils/types'
import { Button, Container } from '@mui/material'
import {
  Player,
  Profile,
  Tournament,
} from '../../../../../../database/database.types'
import React, { useEffect, useState } from 'react'

import AddPlayerForm from './AddPlayerForm'
import GridPlayers from './GridPlayers'
import addNewPlayer from '../../../../../../services/addNewPlayer'
import addNewPlayerToRound from '../../../../../../services/addNewPlayerToRound'
import getProfile from '../../../../../../services/getProfile'
import getTournamentInfo from '../../../../../../services/getTournamentInfo'
import getTournamentPlayers from '../../../../../../services/getTournamentPlayers'
import useSnackbar from '../../../../../hooks/useSnackbar'

interface Props {
  tournamentId: string
  roundId: string
}
const UserManagement = ({ tournamentId, roundId }: Props) => {
  const [playersList, setPlayersList] = useState<PlayersTotalInfo[]>([])
  const [showAddPlayerForm, setShowAddPlayerForm] = useState<boolean>(false)
  const [tournamentInfo, setTournamentInfo] = useState<Tournament | null>(null)
  const { setAlert } = useSnackbar()

  const addPlayer = async (player: PlayersTotalInfo) => {
    const identifier = player.username ? player.username : player.full_name

    if (playersList.find((elem) => elem.userId === player.userId)) {
      const newAlert: AlertType = {
        open: true,
        severity: 'error',
        message: `User ${identifier} already exists`,
      }
      setAlert(newAlert)
    } else {
      await addNewPlayerToRound([...playersList, player], tournamentId, roundId)
      const newPlayer: Player = {
        id: crypto.randomUUID(),
        tournamentId: tournamentId,
        ranking: 0,
        userId: player.userId ?? '',
      }
      await addNewPlayer(newPlayer)
      setPlayersList((prev) => [...prev, player])
      const newAlert: AlertType = {
        open: true,
        severity: 'success',
        message: `User ${identifier} added`,
      }
      setAlert(newAlert)
    }
  }
  
  const handleAddPlayer = () => {
    setShowAddPlayerForm((prev) => !prev)
  }
  
  const getData = async () => {
    const info = await getTournamentInfo(tournamentId)
    if (info) {
      setTournamentInfo(info)
      if (
        Number(roundId) > Number(info.numberOfRounds) &&
        Number(roundId) >= 0
      ) {
        //intro invalid URL
        return
      }
      if (Number(roundId) === 1) {
        //first round
        const players: Player[] | null = await getTournamentPlayers(
          tournamentId
        )
        if (players) {
          const newPlayers: PlayersTotalInfo[] = players.map(
            (player: Player) => ({
              userId: player.userId ?? '',
              tournamentId: tournamentId,
              VP: '0',
              GW: '0',
              minipoints: '0',
              coinflip: '0',
              round: roundId,
              tableRank: '0',
              dropped: false,
              username: null,
              full_name: null,
              vken: null,
            })
          )

          const result = await Promise.all(
            newPlayers.map(async (elem: PlayersTotalInfo) => {
              if (elem.userId) {
                return await getProfile(elem.userId)
              }
              return null
            })
          )

          const cleanedResult = result.filter(
            (elem): elem is Profile => elem !== null
          )

          const newTotalData: (PlayersTotalInfo | null)[] = newPlayers.map(
            (elem) => {
              const up = cleanedResult.find((r) => r?.userId === elem.userId)
              if (up && up !== undefined) {
                return {
                  ...elem,
                  userId: up.userId,
                  full_name: up?.fullName,
                  username: up.username,
                  vken: up.vken,
                }
              }
              return null
            }
          )
          const cleanedTotalData: PlayersTotalInfo[] = newTotalData.filter(
            (elem): elem is PlayersTotalInfo => elem !== null
          )
          setPlayersList(cleanedTotalData)
        }

        return
      }
      if (Number(roundId) === tournamentInfo?.maxNumberOfPlayers) {
        //is final
        //calculateFinal
        return
      }
      //TODO: other cases. Round 2 & 3
      /* const players: PlayersInTable[] | null = await getPlayersPerRound(
        tournamentId,
        roundId
      )
      if (players) {
        setPlayersList(players)
      } */
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Container>
      <Button onClick={() => handleAddPlayer()}>New player</Button>
      {showAddPlayerForm && (
        <AddPlayerForm
          tournamentId={tournamentId}
          roundId={roundId}
          addPlayer={addPlayer}
        />
      )}
      <GridPlayers playersList={playersList} />
    </Container>
  )
}

export default UserManagement
