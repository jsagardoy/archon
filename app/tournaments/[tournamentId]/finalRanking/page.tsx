'use client'

import React, { useEffect, useState } from 'react'

import { PlayersTotalInfo } from '../../../../utils/types'
import RankingList from './RankingList'
import getRanking from '../../../../services/getRanking'

const FinalRankingPage = ({ params }: { params: { tournamentId: string } }) => {
    const { tournamentId } = params
    const [ranking, setRanking] = useState<PlayersTotalInfo[]>([])
  const getData = async () => {
      const playersList = await getRanking(tournamentId)
      if (playersList) {
          setRanking(playersList)
      }
  }
  useEffect(() => {
    getData()
  }, [])

  return <RankingList ranking={ranking}/>
}

export default FinalRankingPage
