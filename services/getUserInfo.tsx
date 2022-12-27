import { Player, Profile } from '../database/database.types'
import { User, getAuth } from 'firebase/auth'

import { firebaseApp } from './auth'

const getProfileInfo = async (userId: string): Promise<Profile> | null => {
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

  

  try {
  } catch (error) {
    return null
  }
}

export default getProfileInfo
