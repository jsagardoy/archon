import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'

import { PlayersTotalInfo } from '../utils/types'
import { db } from '../database/config'

const updatePlayerInRoundInfoByVken = async (
  player: PlayersTotalInfo,
  tournamentId: string,
  round: string
): Promise<boolean> => {
  try {
    const taskDocRef = doc(db, `playersInRound/${tournamentId}-${round}`)

    const data = await getDoc(taskDocRef)
    if (!data.data()) {
      throw new Error('Error getting data')
    }
    const pir = data.data() as {
      tournamentId: string
      round: string
      playersInRound: PlayersTotalInfo[]
    }
    if (pir) {
      const newPir = pir.playersInRound.map((elem) => {
        if (elem.vken === player.vken) {
          return player
        }
        return elem
      })

      await updateDoc(taskDocRef, { ...pir, playersInRound: newPir })
    }

    return true
  } catch (error) {
    return false
  }
}

export default updatePlayerInRoundInfoByVken
