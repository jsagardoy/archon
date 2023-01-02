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
    const newId: string = crypto.randomUUID()
    const taskDocRef = doc(db, `/players/${newId}`)
    const tournament = await getTournamentInfo(tournamentId)
    if (
      !players ||
      !tournament ||
      !taskDocRef ||
      isAlreadySubscribed(tournamentId, playersList, userId) ||
      !isThereSpaceToSubscribe(tournament, players)
    ) {
      return null
    }

    if (
      players &&
      tournament &&
      taskDocRef &&
      !isAlreadySubscribed(tournamentId, playersList, userId) &&
      isThereSpaceToSubscribe(tournament, players)
    ) {
      const newPlayer: Player = {
        tournamentId: tournamentId,
        userId: userId,
        ranking: 0,
        id: newId,
      }
      await setDoc(taskDocRef, newPlayer)
      return newPlayer
    }
  } catch (error) {
    return null
  }
}

export default addPlayerToTournament
