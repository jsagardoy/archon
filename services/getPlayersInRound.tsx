import { collection, getDocs, query, where } from 'firebase/firestore'

import { PlayersInRound } from '../database/database.types'
import { PlayersTotalInfo } from '../utils/types'
import { db } from '../database/config'

const getPlayersInRound = async (
  tournamentId: string,
  round: string
): Promise<PlayersInRound[] | null> => {
  try {
    const docsRef = query(
      collection(db, 'playersInRound'),
      where('tournamentId', '==', tournamentId),
      where('round', '==', round)
    )

    const data = await getDocs(docsRef)

    if (data.empty) {
      return []
    }

    const players: PlayersInRound[] = data.docs.map(
      (elem) => elem.data() as PlayersInRound
    )

    return players
  } catch (error) {
    return null
  }
}

export default getPlayersInRound
