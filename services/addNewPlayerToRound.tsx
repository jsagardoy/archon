import { doc, setDoc } from 'firebase/firestore'

import { PlayersInTable } from '../database/database.types'
import { PlayersTotalInfo } from '../utils/types'
import { db } from '../database/config'

const addNewPlayerToRound = async (
  playersInRound: PlayersTotalInfo[],
  tournamentId: string,
  round: string
) => {
  const id = tournamentId + '-' + round
  const newObject: PlayersInTable = {
    tournamentId: tournamentId,
    round: round,
    playersInRound: playersInRound,
  }
  const docRef = doc(db, `/playersInRound/${id}`)

  try {
    const resp = await setDoc(docRef, newObject)
  } catch (error) {
    console.error(error)
  }
}

export default addNewPlayerToRound
