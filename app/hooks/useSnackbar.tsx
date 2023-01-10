import SnackbarContext from '../context/SnackbarContext'
import { useContext } from 'react'

const useSnackbar = () => {
  const { alert, setAlert } = useContext(SnackbarContext) 

  return { alert, setAlert } 
}

export default useSnackbar
