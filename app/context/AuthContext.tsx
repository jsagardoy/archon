'use client'

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

import { Profile } from '../../database/database.types'
import { auth } from '../../services/auth'
import createProfile from '../../services/createProfile'
import getProfile from '../../services/getProfile'
import { useCookies } from 'react-cookie'

interface AuthInterface {
  signup: (email: string, password: string) => Promise<UserCredential>
  login: (email: string, password: string) => Promise<UserCredential>
  loginGoogle: () => Promise<UserCredential>
  reset: (email: string) => void
  logout: () => void
  getSession: () => User | null
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
    //add Profile
    const newProfile: Profile = {
      userId: userCredential.user.uid,
      username: '',
      fullName:
        userCredential.user.displayName ?? userCredential.user.email ?? '',
      avatarURL: userCredential.user.photoURL ?? '',
      website: '',
      vken: '',
      rol: 'user',
    }
    if (!(await getProfile(userCredential.user.uid))) {
      await createProfile(newProfile)
    }
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

  const loginGoogle = async (): Promise<UserCredential> => {
    const provider = new GoogleAuthProvider()

    const data = await signInWithPopup(auth, provider)

    if (!(await getProfile(data.user.uid))) {
      const newProfile: Profile = {
        userId: data.user.uid,
        username: '',
        fullName: data.user.displayName ?? data.user.email ?? '',
        avatarURL: data.user.photoURL ?? '',
        website: '',
        vken: '',
        rol: 'user',
      }
      await createProfile(newProfile)
    }

    return data
  }
  const getSession = (): User | null => {
    return cookies.FirebaseAuth as User ?? null
  }
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ?? undefined)
      setCookie('FirebaseAuth', JSON.stringify(currentUser))
    })
  }, [])

  return (
    <context.Provider
      value={{ signup, login, user, logout, reset, loginGoogle, getSession }}
    >
      {children}
    </context.Provider>
  )
}

export default AuthProvider
