import { context } from '../context/AuthContext'
import { useContext } from 'react'
export const useAuth = () => {
  const authContext = useContext(context)
  return authContext
}
