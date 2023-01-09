import { doc, setDoc } from 'firebase/firestore'

import { Player } from '../database/database.types'
import { db } from '../database/config'

const addNewPlayer = async (player: Player) => {
  const id = crypto.randomUUID()
  const docRef = doc(db, `/players/${id}`)

  try {
    const resp = await setDoc(docRef, player)
  } catch (error) {
    console.error(error)
  }
}

export default addNewPlayer
