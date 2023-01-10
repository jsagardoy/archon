import {
  PlayersContextProvider,
  PlayersContextType,
  context,
} from '../context/PlayersContext'

import { useContext } from 'react'

const usePlayersList = () => {
  const { playersList, setPlayersList } =
    useContext<PlayersContextType>(context)
  return { playersList, setPlayersList }
}
export default usePlayersList
