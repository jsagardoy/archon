'use client'

import React, { createContext, useState } from 'react'

import { PlayersTotalInfo } from '../../utils/types'

export interface PlayersContextType {
  playersList: PlayersTotalInfo[]
  setPlayersList: (playersList: PlayersTotalInfo[]) => void
}
export const context = createContext<PlayersContextType>({
  playersList: [],
  setPlayersList: () => {},
})

export const PlayersContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [playersList, setPlayersList] = useState<PlayersTotalInfo[]>([])
  const value = { playersList, setPlayersList }
  return <context.Provider value={value}>{children}</context.Provider>
}

export default PlayersContextProvider
