import { collection, getDocs, query, where } from 'firebase/firestore'

import { PlayersInRound } from '../database/database.types'
import { PlayersTotalInfo } from '../utils/types'
import { db } from '../database/config'

const getFinalRound = async (
  tournamentId: string,
  roundId: string
): Promise<PlayersInRound | null> => {
  try {
    const docsRef = query(
      collection(db, 'playersInRound'),
      where('tournamentId', '==', tournamentId)
    )

    const data = await getDocs(docsRef)

    if (data.empty) {
      return null
    }

    const rounds: PlayersInRound[] = data.docs.map(
      (elem) => elem.data() as PlayersInRound
    )

    const playersInRounds: PlayersTotalInfo[] = rounds.flatMap((elem) =>
      elem.playersInRound.map((elem2) => elem2)
    )

    const initialPlayersTotalInfo: PlayersTotalInfo = {
      userId: null,
      username: null,
      full_name: null,
      vken: null,
      tournamentId: tournamentId,
      VP: '0',
      GW: '0',
      minipoints: '0',
      coinflip: null,
      round: roundId,
      tableRank: '0',
      dropped: false,
    }

    const unique = new Set(playersInRounds.map((elem) => elem.vken))
    const uniqueArray = Array.from(unique)
    const groupedData = uniqueArray.map((elem) =>
      playersInRounds
        .filter((elem2) => elem2.vken === elem)
        .reduce((acc, current) => {
          return {
            ...current,
            round: roundId,
            GW: String(Number(acc.GW) + Number(current.GW)),
            VP: String(Number(acc.VP) + Number(current.VP)),
            minipoints: String(
              Number(acc.minipoints) + Number(current.minipoints)
            ),
          }
        }, initialPlayersTotalInfo)
    )

    const finalData: PlayersInRound = {
      tournamentId: tournamentId,
      round: roundId,
      playersInRound: groupedData,
    }
    return finalData
  } catch (error) {
    return null
  }
}

export default getFinalRound
