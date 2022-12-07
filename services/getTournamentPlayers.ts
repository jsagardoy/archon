import { PlayerType, TournamentType } from '../utils/database.types'

import { AlertType } from '../utils/types'
import { supabase } from '../utils/supabase'

const getTournamentPlayers = async (
  tournamentId: string
): Promise<PlayerType[] | null> => {
  try {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('id_tournament', tournamentId)

    return data as PlayerType[]
  } catch (error) {
    console.error(error)
    return null
  }
}

export default getTournamentPlayers
