import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../database/config'
import getTournamentPlayers from './getTournamentPlayers'

const removePlayerFromTournament = async (
  tournamentId: string,
  userId: string
): Promise<boolean> => {
  try {
    const players = await getTournamentPlayers(tournamentId)
    if (players) {
      const selectedId: string | undefined = players.find(
        (elem) => elem.userId === userId && elem.tournamentId === tournamentId
      )?.id
      if (selectedId) {
        const taskDocRef = doc(db, `/players/${selectedId}`)
        await deleteDoc(taskDocRef)
        return true
      }
      return false
    }
    return false
  } catch (error) {
    return false
  }

}

export default removePlayerFromTournament
