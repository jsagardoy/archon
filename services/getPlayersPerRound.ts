import { collection, getDocs, query, where } from 'firebase/firestore'

import { PlayersInTable } from '../utils/types'
import { db } from '../database/config'

const getPlayersPerRound = async (
  tournamentId: string,
  round: string
): Promise<PlayersInTable[] | null> => {
  try {
    const docsRef = query(
      collection(db, 'playersInTable'),
      where('tournamentId', '==', tournamentId),
      where('round', '==', round)
    )

    const data = await getDocs(docsRef)

    if (data.empty) {
      return []
    }

    const playersPerRound: PlayersInTable[] = data.docs.map(
      (elem) => elem.data() as PlayersInTable
    )

    return playersPerRound

 
  } catch (error) {
    return null
  }
}

export default getPlayersPerRound
