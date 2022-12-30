import { User } from 'firebase/auth'
import { useState } from 'react'
import { useCookies } from 'react-cookie'

const useSession = () => {
  const [cookies] = useCookies(['FirebaseAuth'])
  const session = cookies.FirebaseAuth ? (cookies.FirebaseAuth as User) : null

  return { session }
}

export default useSession
