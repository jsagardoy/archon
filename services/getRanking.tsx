import { doc, getDoc } from 'firebase/firestore'

import { PlayersTotalInfo } from '../utils/types'
import { Profile } from '../database/database.types'
import { db } from '../database/config'

const getRanking = async (
  tournamentId: string
): Promise<PlayersTotalInfo[] | null> => {
  const taskDocRef = doc(db, `/tournamentRanking/${tournamentId}`)
  try {
    const docSnap = await getDoc(taskDocRef)
    if (docSnap.exists()) {
      const playersList: PlayersTotalInfo[] = docSnap.data().playersList
      return playersList
    }
    return null
  } catch (error) {
    return null
  }
}

export default getRanking
