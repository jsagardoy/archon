import { PlayerType, TournamentType } from './database.types'

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
  tournament: TournamentType,
  players: PlayerType[]
): boolean => {
  return players.length < Number(tournament.max_num_of_players)
}
