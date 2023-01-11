'use client'

import React, { createContext, useState } from 'react'

import { PlayersTotalInfo } from '../../utils/types'

export interface PlayersContextType {
  playersList: PlayersTotalInfo[]
  setPlayersList: (playersList: PlayersTotalInfo[]) => void
  tables5: PlayersTotalInfo[][]
  setTables5: (tables5: PlayersTotalInfo[][]) => void
  tables4: PlayersTotalInfo[][]
  setTables4: (tables4: PlayersTotalInfo[][]) => void
}
export const context = createContext<PlayersContextType>({
  playersList: [],
  setPlayersList: () => {},
  tables5: [],
  setTables5: () => {},
  tables4: [],
  setTables4: () => {},
})

export const PlayersContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [playersList, setPlayersList] = useState<PlayersTotalInfo[]>([])
  const [tables5, setTables5] = useState<PlayersTotalInfo[][]>([])
  const [tables4, setTables4] = useState<PlayersTotalInfo[][]>([])

  const value = {
    playersList,
    setPlayersList,
    tables5,
    setTables5,
    tables4,
    setTables4,
  }
  return <context.Provider value={value}>{children}</context.Provider>
}

export default PlayersContextProvider
