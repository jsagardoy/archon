import{Profile} from '../database/database.types'
import { firebaseApp } from './auth'
import { getAuth } from 'firebase/auth'

const getPlayerInfo = async (userId: string): Promise<Profile> | null => {
  /*   try {
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
  } */

  const auth = getAuth()
  const user = auth.currentUser
  {}

  try {
    
  } catch (error) {
    return null
  }
}

export default getPlayerInfo
