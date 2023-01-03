import { collection, getDocs, orderBy, query } from 'firebase/firestore'

import { Tournament } from '../database/database.types'
import { date } from 'zod'
import { db } from '../database/config'

const getTournamentsData = async (): Promise<Tournament[] | null> => {
  try {
    const collectionRef = query(collection(db, `/tournaments/`), orderBy('date'))

    const docsSnap = await getDocs(collectionRef)

    if (!docsSnap.empty) {
      const data = docsSnap.docs.map((elem) => elem.data() as Tournament)
      return data
    }
    return []
  } catch (error) {
    console.error(error)
    return null
  }
}

export default getTournamentsData
