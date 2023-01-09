import { collection, getDocs, query, where } from 'firebase/firestore'

import { PlayersInRound } from '../database/database.types'
import { db } from '../database/config'

const getPlayersPerRound = async (
  tournamentId: string,
  round: string
): Promise<PlayersInRound[] | null> => {
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

    const playersPerRound: PlayersInRound[] = data.docs.map(
      (elem) => elem.data() as PlayersInRound
    )

    return playersPerRound

 
  } catch (error) {
    return null
  }
}

export default getPlayersPerRound
