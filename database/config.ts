import { firebaseApp } from '../services/auth'
import { getFirestore } from 'firebase/firestore'

export const db = getFirestore(firebaseApp)
