import { UserProfile } from '../utils/types'
import { supabase } from '../utils/supabase'

const getPlayerInfo = async (userId: string): Promise<UserProfile> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)

    if (error) {
      throw error
    }
    if (data && data.length>0) {
      return data[0] as UserProfile
    }
      throw error
  } catch (error) {
    return {
      id: '',
      updated_at: null,
      username: null,
      full_name: null,
      avatar_url: null,
      website: null,
      vken: null,
      rol: null,
    }
  }
}

export default getPlayerInfo
