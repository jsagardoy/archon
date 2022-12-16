import { UserProfile } from '../utils/types'
import { supabase } from '../utils/supabase'

const getPlayerInfoByVken = async (vken: string): Promise<UserProfile|null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('vken', vken)

    if (error) {
      throw error
    }
    if (data && data.length > 0) {
      return data[0] as UserProfile
    }
    throw error
  } catch (error) {
    return null
  }
}

export default getPlayerInfoByVken
