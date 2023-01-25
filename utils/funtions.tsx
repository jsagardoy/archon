import { Player, Tournament } from '../database/database.types'

import { PlayersList } from './types'

export const isAlreadySubscribed = (tournamentId: string, playersList: PlayersList[], userId:string): boolean => {
  return playersList
    ?.filter((elem) => elem.tournamentId === tournamentId)
    .find((elem) =>
      elem.players.find((player) => player.userId === userId)
    ) !== undefined
    ? true
    : false
}

export const isThereSpaceToSubscribe = (
  tournament: Tournament,
  playersList: Player[]
): boolean => {
  return playersList.length < Number(tournament.maxNumberOfPlayers)
}

export const isDateInBetweenDates = (
  startDate: string,
  endDate: string,
  compare: string
): boolean => {
  const formatedDate = new Date(compare)
  formatedDate.setHours(23, 59, 59)
  const start = new Date(startDate)
  start.setHours(parseInt('00', 8), parseInt('00', 8), parseInt('00', 8))
  const end = new Date(endDate)
  start.setHours(23, 59, 59)
  return (
    formatedDate.getTime() >= start.getTime() &&
    formatedDate.getTime() <= end.getTime()
  )
}
export const DEFAULT_USER_URL='https://i.stack.imgur.com/34AD2.jpg'