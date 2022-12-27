import { doc, setDoc } from 'firebase/firestore'

import { Profile } from '../database/database.types'
import { db } from '../database/config'

const createProfile = async (profile: Profile): Promise<boolean> => {
    const taskDockRef = doc(db, `/profile/${profile.userId}`)
  try {
      
    await setDoc(taskDockRef, profile)
    return true
  } catch (error) {
    return false
  }
}

export default createProfile
