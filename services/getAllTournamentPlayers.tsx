import { PlayerType, TournamentType } from '../utils/database.types'

import { AlertType } from '../utils/types'
import { supabase } from '../utils/supabase'

const getAllTournamentPlayers = async (): Promise<PlayerType[] | null> => {
  try {
    const { data, error } = await supabase
      .from('players')
      .select('*')
    return data as PlayerType[]
  } catch (error) {
    console.error(error)
    return null
  }
}

export default getAllTournamentPlayers
