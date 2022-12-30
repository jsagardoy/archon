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
