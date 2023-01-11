import {
  PlayersContextProvider,
  PlayersContextType,
  context,
} from '../context/PlayersContext'

import { useContext } from 'react'

const usePlayersList = () => {
  const {
    playersList,
    setPlayersList,
    tables5,
    setTables5,
    tables4,
    setTables4,
  } = useContext<PlayersContextType>(context)
  return {
    playersList,
    setPlayersList,
    tables5,
    setTables5,
    tables4,
    setTables4,
  }
}
export default usePlayersList
