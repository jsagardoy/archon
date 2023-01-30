'use client'

import {
  PlayersInRound,
  Tournament,
} from '../../../../../../../database/database.types'
import React, { useEffect } from 'react'

import { Container } from '@mui/material'
import FinalGridPlayers from './FinalGridPlayers'
import { PlayersTotalInfo } from '../../../../../../../utils/types'
import getFinalRound from '../../../../../../../services/getFinalRound'
import updatePlayerInRoundInfoByVken from '../../../../../../../services/updatePlayerInfoByVken'
import usePlayersList from '../../../../../../hooks/usePlayersList'

interface Props {
  tournamentInfo: Tournament
  tournamentId: string
  roundId: string
}
const FinalUserManagement = ({
  tournamentInfo,
  tournamentId,
  roundId,
}: Props) => {
  const { playersList, setPlayersList } = usePlayersList()

  const calculateCoinflip = () =>
    String(Math.round(Math.abs((Math.random() - 0.5) * 100000)))

  const getData = async () => {
    //TODO: load data from bd for results
    if (playersList && playersList.length > 0) {
      //Si ya hay datos en el estado, no vuelvas a cargarlos
      return
    }
    const info = tournamentInfo

    if (info) {
      //setTournamentInfo(info)
      if (Number(roundId) === tournamentInfo?.numberOfRounds) {
        //final Round
        //calculateFinal
        const data: PlayersInRound | null = await getFinalRound(
          tournamentId,
          roundId
        )
        if (data) {
          const newPlayersList: PlayersTotalInfo[] = data.playersInRound
            .filter((elem) => !elem.dropped)
            .map((elem: PlayersTotalInfo) => ({
              ...elem,
              coinflip: calculateCoinflip(),
            }))
            .sort(
              (a: PlayersTotalInfo, b: PlayersTotalInfo) =>
                Number(b.coinflip) - Number(a.coinflip)
            )
            .sort(
              (a: PlayersTotalInfo, b: PlayersTotalInfo) =>
                Number(b.minipoints) - Number(a.minipoints)
            )
            .sort(
              (a: PlayersTotalInfo, b: PlayersTotalInfo) =>
                Number(b.VP) - Number(a.VP)
            )
            .sort(
              (a: PlayersTotalInfo, b: PlayersTotalInfo) =>
                Number(b.GW) - Number(a.GW)
            )
          setPlayersList(newPlayersList)
          window.sessionStorage.setItem('final', JSON.stringify(newPlayersList))
          return
        }
        return
      }
    }
  }

  const dropPlayer = async (index: number) => {
    const newObject: PlayersTotalInfo = {
      ...playersList[index],
      dropped: !playersList[index].dropped,
    }
    const newList: PlayersTotalInfo[] = [...playersList]
    newList[index] = newObject
    setPlayersList(
      newList.sort(
        (a: PlayersTotalInfo, b: PlayersTotalInfo) =>
          Number(a.dropped) - Number(b.dropped)
      )
    )
    await updatePlayerInRoundInfoByVken(newObject, tournamentId, roundId)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        maxHeight: '65vh',
        height: '65vh',
      }}
    >
      <FinalGridPlayers
        playersList={playersList}
        dropPlayer={(index: number) => dropPlayer(index)}
      />
    </Container>
  )
}

export default FinalUserManagement
