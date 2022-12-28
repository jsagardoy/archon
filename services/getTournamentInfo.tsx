import { doc, getDoc } from 'firebase/firestore'

import { Tournament } from '../database/database.types'
import { db } from '../database/config'

const getTournamentInfo = async (
  tournamentId: string
): Promise<Tournament | null> => {
  const taskDockRef = doc(db, `/tournaments/${tournamentId}`)
  try {
    const docSnap = await getDoc(taskDockRef)
    if (docSnap.exists()) {
      const tournament: Tournament = docSnap.data() as Tournament
      return tournament
    }
    return null
  } catch (error) {
    return null
  }
}

export default getTournamentInfo
