import { doc, updateDoc } from 'firebase/firestore'

import { Profile } from '../database/database.types'
import { db } from '../database/config'

const updateProfile = async (profile: Profile): Promise<boolean> => {
  const taskDocRef = doc(db, `/profile/${profile.userId}`)
  try {
    await updateDoc(taskDocRef, profile)
    return true
  } catch (error) {
    return false
  }
}

export default updateProfile
