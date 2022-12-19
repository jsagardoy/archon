'use client'

import {
  AlertType,
  PlayersInTable,
  PlayersInTableTotalInfo,
  PlayersList,
  UserProfile,
} from '../../../../../../utils/types'
import { Button, Container } from '@mui/material'
import {
  PlayerType,
  TournamentType,
} from '../../../../../../utils/database.types'
import React, { useEffect, useState } from 'react'

import AddPlayerForm from './AddPlayerForm'
import GridPlayers from './GridPlayers'
import getPlayerInfo from '../../../../../../services/getPlayerInfo'
import getTournamentInfo from '../../../../../../services/getTournamentInfo'
import getTournamentPlayers from '../../../../../../services/getTournamentPlayers'
import useSnackbar from '../../../../../hooks/useSnackbar'

interface Props {
  tournamentId: string
  roundId: string
}
const UserManagement = ({ tournamentId, roundId }: Props) => {
  const [playersList, setPlayersList] = useState<PlayersInTableTotalInfo[]>([])
  const [showAddPlayerForm, setShowAddPlayerForm] = useState<boolean>(false)
  const [tournamentInfo, setTournamentInfo] = useState<TournamentType | null>(
    null
  )
  const { setAlert } = useSnackbar()

  const addPlayer = (player: PlayersInTableTotalInfo) => {

    const identifier = player.username?player.username:player.full_name

    if (playersList.find(elem=>elem.userId===player.userId)) {
      const newAlert: AlertType = {
        open: true,
        severity: 'error',
        message: `User ${identifier} already exists`,
      }
      setAlert(newAlert)
    } else {
      //TODO:insert into database
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
        Number(roundId) > Number(info.number_of_rounds) &&
        Number(roundId) >= 0
      ) {
        //intro invalid URL
        return
      }
      if (Number(roundId) === 1) {
        //first round
        const players: PlayerType[] | null = await getTournamentPlayers(
          tournamentId
        )
        if (players) {
          const newPlayers: PlayersInTable[] = players.map(
            (player: PlayerType) => ({
              playerId: player.userId ?? '',
              tournamentId: tournamentId,
              VP: '0',
              GW: '0',
              minipoints: '0',
              coinflip: '0',
              round: roundId,
              tableRank: '0',
              dropped: false,
            })
          )

          const result = await Promise.all(
            newPlayers.map(async (elem: PlayersInTable) => {
              if (elem.playerId) {
                return await getPlayerInfo(elem.playerId)
              }
              return null
            })
          )

          const cleanedResult = result.filter(
            (elem): elem is UserProfile => elem !== null
          )

          const newTotalData: (PlayersInTableTotalInfo | null)[] =
            newPlayers.map((elem) => {
              const up = cleanedResult.find((r) => r?.id === elem.playerId)
              if (up && up !== undefined) {
                return {
                  ...elem,
                  userId: up.id,
                  full_name: up?.full_name,
                  username: up.username,
                  vken: up.vken,
                }
              }
              return null
            })
          const cleanedTotalData: PlayersInTableTotalInfo[] =
            newTotalData.filter(
              (elem): elem is PlayersInTableTotalInfo => elem !== null
            )
          setPlayersList(cleanedTotalData)
        }

        return
      }
      if (roundId === tournamentInfo?.number_of_rounds) {
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
