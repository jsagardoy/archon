import { collection, getDocs, query, where } from 'firebase/firestore'

import { Profile } from '../database/database.types'
import { db } from '../database/config'

const getPlayerInfoByVken = async (vken: string): Promise<Profile | null> => {
  try {
    const docRef = collection(db, '/profile')
    const q = query(docRef, where('vken', '==', vken))

    const data = await getDocs(q)

    if (data.empty) {
      return null
    }

    return data.docs[0].data() as Profile
  } catch (error) {
    return null
  }
}

export default getPlayerInfoByVken
