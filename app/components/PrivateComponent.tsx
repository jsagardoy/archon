'use client'

import { ReactElement } from 'react'
import { useAuth } from '../hooks/useAuth'
interface Props {
  children: ReactElement
}

const PrivateComponent = ({ children }: Props) => {
  //show only if user is logged in

  const { user } = useAuth()
  return user ? children : null
}

export default PrivateComponent
