import { PlayerType, TournamentType } from '../utils/database.types'

import { AlertType } from '../utils/types'
import { supabase } from '../utils/supabase'

const removePlayerFromTournament = async (
  tournamentId: string,
  userId: string
): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('players')
      .delete()
      .eq('id_tournament', tournamentId)
      .eq('userId', userId)

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export default removePlayerFromTournament
