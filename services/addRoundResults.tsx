import { doc, setDoc } from 'firebase/firestore'

import { PlayersInRound } from '../database/database.types'
import { PlayersTotalInfo } from '../utils/types'
import { db } from '../database/config'

const addRoundResults = async (
  playersList: PlayersTotalInfo[],
  tournamentId: string,
  roundId: string
) => {
    const docRef = doc(db, `/playersInRound/${tournamentId}-${roundId}`)
    
    
  try {
    const newData: PlayersInRound = {
      tournamentId: tournamentId,
      round: roundId,
      playersInRound: playersList,
    }
    await setDoc(docRef, newData)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export default addRoundResults
