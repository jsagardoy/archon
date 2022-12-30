import { collection, doc, getDocs } from 'firebase/firestore'

import { Tournament } from '../database/database.types'
import { db } from '../database/config'

const getTournamentsData = async (): Promise<Tournament[] | null> => {
  try {
    const collectionRef = collection(db, `/tournaments/`)

    const docsSnap = await getDocs(collectionRef)

    if (!docsSnap.empty) {
      const data = docsSnap.docs.map((elem) => elem.data() as Tournament)

      const sortedData: Tournament[] = [...(data as Tournament[])].sort(
        (a, b) =>
          a && b && a.date && b.date
            ? a.date.toString().localeCompare(b.date.toString())
            : 1
      )
      return sortedData
    }
    return []
  } catch (error) {
    console.error(error)
    return null
  }
}

export default getTournamentsData
