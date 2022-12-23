import {
  GoogleAuthProvider,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  verifyBeforeUpdateEmail,
} from 'firebase/auth'
import React, { createContext, useEffect, useState } from 'react'

import { auth } from '../../services/auth'
import { useCookies } from 'react-cookie'

interface AuthInterface {
  signup: (email: string, password: string) => Promise<UserCredential>
  login: (email: string, password: string) => Promise<UserCredential>
  loginGoogle: () => Promise<UserCredential>
  reset: (email: string) => void
  logout: () => void
  user: User | null
}

export const context = createContext<Partial<AuthInterface>>({})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>()
  const [cookies, setCookie, removeCookie] = useCookies(['FirebaseAuth'])
  const signup = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    await sendEmailVerification(userCredential.user)
    return userCredential
  }

  const login = (email: string, password: string): Promise<UserCredential> =>
    signInWithEmailAndPassword(auth, email, password)

  const logout = () => {
    signOut(auth)
    removeCookie('FirebaseAuth')
  }

  const reset = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email)
      
    } catch (error) {
      console.error(error)
    }
  }

  const loginGoogle = (): Promise<UserCredential> => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ?? undefined)
      setCookie('FirebaseAuth', JSON.stringify(currentUser))
    })
  }, [])

  return (
    <context.Provider value={{ signup, login, user, logout, reset, loginGoogle }}>
      {children}
    </context.Provider>
  )
}

export default AuthProvider
