import { doc, getDoc } from 'firebase/firestore'

import { Profile } from '../database/database.types'
import { db } from '../database/config'

const getProfile = async (uid: string): Promise<Profile | null> => {
  const taskDockRef = doc(db, `/profile/${uid}`)
  try {
    const docSnap = await getDoc(taskDockRef)
    if (docSnap.exists()) {
      const profile: Profile = docSnap.data() as Profile
      return profile
    }
    return null
  } catch (error) {
    return null
  }
}

export default getProfile
