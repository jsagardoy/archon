export type Profile = {
    userId: string,
    username: string,
    fullName: string,
    avatarURL: string,
    website: string,
    vken: string,
    rol: string
}

export type PlayersInTable = {
    id: string,
    playerId: string,
    tournamentId: string,
    VP: number,
    GW: number,
    minipoints: number,
    coinflip: number,
    round: number,
    tableRank: number,
    dropped: boolean,
}

export type Player = {
    id: string,
    tournamentId: string,
    ranking: number,
    userId: string,
}

export type Table = {
    id: string,
    round: number,
    tournamentId:string,
}
export type Tournament = {
    tournamentId: string,
    name: string,
    tournamentType: string,
    description: string,
    date: Date,
    hour: string,
    numberOfRounds: number,
    maxNumberOfPlayers: number,
    active: boolean,
    details: string,
    price: string,
    country: string,
    state: string,
    city: string,
    address: string,
    currency: string
    userId: string,
}
