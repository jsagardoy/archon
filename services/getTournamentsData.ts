import { AlertType } from '../utils/types'
import { TournamentType } from '../utils/database.types'
import { supabase } from '../utils/supabase'

const getTournamentsData = async (): Promise<TournamentType[] | null> => {

  try {
    const { data, error } = await supabase
      .from('tournament')
      .select('*')
      .eq('active', true)
    const sortedData = [...(data as TournamentType[])].sort((a, b) =>
      a && b && a.date && b.date ? a.date.localeCompare(b.date) : 1
    )
    return sortedData
  } catch (error) {

    console.error(error)
    return null
  }
}

export default getTournamentsData
