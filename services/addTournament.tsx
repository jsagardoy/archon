import { doc, setDoc } from 'firebase/firestore'

import { Tournament } from '../database/database.types'
import { db } from '../database/config'

const addTournament = async (tournament: Tournament): Promise<boolean> => {
  const taskDocRef = doc(db, `/tournaments/${tournament.tournamentId}`)
  try {
    await setDoc(taskDocRef, tournament)
    return true
  } catch (error) {
    return false
  }
}

export default addTournament
