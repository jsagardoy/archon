import { collection, getDocs, query, where } from 'firebase/firestore'

import { Player } from '../database/database.types'
import { db } from '../database/config'

const getAllTournamentPlayers = async (): Promise<Player[] | null> => {
  try {
    const docsRef = collection(db, '/players')
    const data = await getDocs(docsRef)

    if (data.empty) {
      return []
    }

    const allPlayers: Player[] = data.docs.map((elem) => elem.data() as Player)
    return allPlayers
  } catch (error) {
    console.error(error)
    return null
  }
}

export default getAllTournamentPlayers
