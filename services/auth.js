import { getAuth } from 'firebase/auth'
/* import { getAnalytics } from 'firebase/analytics' */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAYSTk0ggCvrHcVuRHcDYfa6cNZHehm-I8',
  authDomain: 'archon-vtes.firebaseapp.com',
  projectId: 'archon-vtes',
  storageBucket: 'archon-vtes.appspot.com',
  messagingSenderId: '239868448847',
  appId: '1:239868448847:web:b7db5427c0a70cf70e9a3a',
  measurementId: 'G-CXR8HP943C',
}

// Initialize Firebase

export const firebaseApp = initializeApp(firebaseConfig)
/* //const analytics = getAnalytics(app) */
export const auth = getAuth(firebaseApp)
/* auth.useDeviceLanguage()  */
