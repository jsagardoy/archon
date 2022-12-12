import { AlertType, PlayersList } from '../utils/types'
import { isAlreadySubscribed, isThereSpaceToSubscribe } from '../utils/funtions'

import getTournamentInfo from './getTournamentInfo'
import { supabase } from '../utils/supabase'
import useSnackbar from '../app/hooks/useSnackbar'

const addPlayerToTournament = async (
  tournamentId: string,
  userId: string,
  playersList: PlayersList[]
) => {

  const players = playersList.find(
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
}

export default addPlayerToTournament
