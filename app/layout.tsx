'use client'

import React, { Suspense, useState } from 'react'

import AuthProvider from './context/AuthContext'
import { CookiesProvider } from 'react-cookie'
import Header from './components/Header'
import SnackbarComponent from './components/SnackbarComponent'
import { SnackbarContextProvider } from './context/SnackbarContext'

const Layout = ({ children }: any) => {
  return (
    <html>
      <head>
        <title>Vtes Archon</title>
      </head>
      <AuthProvider>
        <body>
          <header>
            <Header />
          </header>
          <CookiesProvider>
            <SnackbarContextProvider>
              <main>
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
