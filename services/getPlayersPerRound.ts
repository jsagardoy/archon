import { PlayersInTable } from '../utils/types'
import { PostgrestError } from '@supabase/supabase-js'
import { supabase } from '../utils/supabase'

const getPlayersPerRound = async (
  tournamentId: string,
  round: string
): Promise<PlayersInTable[] | null> => {
  try {
    const { data, error } = await supabase
      .from('players_in_table')
      .select('*')
      .eq('tournamentId', tournamentId)
      .eq('round', round)

    if (error) {
      throw error
    }
    if (data) {
      return data as PlayersInTable[]
    }
    throw error
  } catch (error) {
    return null
  }
}

export default getPlayersPerRound
