import { AlertType, PlayersList } from '../utils/types'
import { Player, Profile } from '../database/database.types'
import { doc, setDoc } from 'firebase/firestore'
import { isAlreadySubscribed, isThereSpaceToSubscribe } from '../utils/funtions'

import { db } from '../database/config'
import getTournamentInfo from './getTournamentInfo'
import useSnackbar from '../app/hooks/useSnackbar'

const addPlayerToTournament = async (
  tournamentId: string,
  userId: string,
  playersList: PlayersList[]
) => {
  try {
    const players = playersList.find(
      (elem) => elem.tournamentId === tournamentId
    )?.players
    const taskDocRef = doc(db, `/players/${userId}`)
    const tournament = await getTournamentInfo(tournamentId)
    if (
      players &&
      tournament &&
      taskDocRef &&
      isAlreadySubscribed(tournamentId, playersList, userId) &&
      isThereSpaceToSubscribe(tournament, players)
    ) {
      const newPlayer: Player = {
        tournamentId: tournamentId,
        userId: userId,
        ranking: 0,
        id: crypto.randomUUID(),
      }
      await setDoc(taskDocRef, newPlayer)
      return true
    }
  } catch (error) {
    return false
  }
}

/*  const players = playersList.find(
    (elem) => elem.tournamentId === tournamentId
  )?.players

  if (players) {
    const tournament = await getTournamentInfo(tournamentId)

    if (
      tournament &&
      !isAlreadySubscribed(tournamentId, playersList, userId) &&
      isThereSpaceToSubscribe(tournament, players)
    ) {
      try {
        const { data, error } = await supabase
          .from('players')
          .insert({ id_tournament: tournamentId, ranking: 0, userId: userId })
          .single()
        if (error) {
          throw error
        }
        return true
      } catch (error) {
        return false
      }
    }
  }
  return false 
}*/

export default addPlayerToTournament
