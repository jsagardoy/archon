import { doc, setDoc } from 'firebase/firestore'

import { PlayersInRound } from '../database/database.types'
import { PlayersTotalInfo } from '../utils/types'
import { db } from '../database/config'

const addTournamentRanking = async (
  playersList: PlayersTotalInfo[],
  tournamentId: string,
) => {
    const docRef = doc(db, `/tournamentRanking/${tournamentId}`)
    
    
  try {
    await setDoc(docRef, {playersList})
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export default addTournamentRanking
