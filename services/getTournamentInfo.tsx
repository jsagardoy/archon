import { TournamentType } from '../utils/database.types'
import { supabase } from '../utils/supabase'

const getTournamentInfo = async (tournamentId: string) => {
  try {
    const { data, error } = await supabase
      .from('tournament')
      .select('*')
      .eq('id', tournamentId)

    if (error) {
      throw error
    }
    if (data.length < 1) {
      throw 'Id not found'
    }

    return data[0] as TournamentType
  } catch (error) {
    console.error(error)
    return null
  }
}
export default getTournamentInfo