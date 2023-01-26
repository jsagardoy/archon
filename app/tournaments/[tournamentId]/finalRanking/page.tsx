'use client'

import React, { useEffect, useState } from 'react'

import { PlayersTotalInfo } from '../../../../utils/types'
import RankingList from './RankingList'
import { Tournament } from '../../../../database/database.types'
import getFinalRound from '../../../../services/getFinalRound'
import getRanking from '../../../../services/getRanking'
import getTournamentInfo from '../../../../services/getTournamentInfo'

const FinalRankingPage = ({ params }: { params: { tournamentId: string } }) => {
  const { tournamentId } = params
  const [ranking, setRanking] = useState<PlayersTotalInfo[]>([])
  const [tournamentInfo, setTournamentInfo]=useState<Tournament|null>(null)
  const getData = async () => {
    const playersList = await getRanking(tournamentId)
    const tournamentInfo = await getTournamentInfo(tournamentId)
    if (playersList && tournamentInfo) {
      setTournamentInfo(tournamentInfo)
      const finalRound = await getFinalRound(
        tournamentId,
        tournamentInfo.numberOfRounds.toString()
      )
      const newRanking = playersList.map(
        (elem) =>
          finalRound?.playersInRound.find(
            (elem2) => elem2.userId === elem.userId
          ) ?? elem
      )
      setRanking(newRanking)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  return <RankingList ranking={ranking} tournamentInfo={tournamentInfo} />
}

export default FinalRankingPage
