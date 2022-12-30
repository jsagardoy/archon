import { collection, doc, getDoc, getDocs } from 'firebase/firestore'

import { Player } from '../database/database.types'
import { Tournament } from '../database/database.types'
import { db } from '../database/config'

const getTournamentPlayers = async (
  tournamentId: string
): Promise<Player[] | null> => {
  const taskCollectionRef = collection(db, `/players`)
  try {
    const docsSnap = await getDocs(taskCollectionRef)

    if (docsSnap.empty) {
      return []
    }
    if (!docsSnap.empty) {
      const players: Player[] = docsSnap.docs.map(
        (elem) => elem.data() as Player
      )

      const playersInTournament: Player[] = players.filter(
        (elem) => elem.tournamentId === tournamentId
      )
      return playersInTournament
    }
    return null
  } catch (error) {
    return null
  }
}


export default getTournamentPlayers
