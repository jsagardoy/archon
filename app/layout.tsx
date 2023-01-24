'use client'

import './componentStyles/body.css'

import AuthProvider from './context/AuthContext'
import { CookiesProvider } from 'react-cookie'
import Header from './components/Header'
import React from 'react'
import SnackbarComponent from './components/SnackbarComponent'
import { SnackbarContextProvider } from './context/SnackbarContext'

const Layout = ({ children }: any) => {
  return (
    <html>
      <head>
        <title>Vtes Archon</title>
      </head>
      <AuthProvider>
        <body className="body">
          <header>
            <Header />
          </header>
          <CookiesProvider>
            <SnackbarContextProvider>
              <main className="main">
                {children}
                <SnackbarComponent />
              </main>
            </SnackbarContextProvider>
          </CookiesProvider>
        </body>
      </AuthProvider>
    </html>
  )
}

export default Layout
