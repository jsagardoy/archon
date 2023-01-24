'use client'

import './componentStyles/body.css'

import { ThemeOptions, ThemeProvider, createTheme } from '@mui/material'

import AuthProvider from './context/AuthContext'
import { CookiesProvider } from 'react-cookie'
import Header from './components/Header'
import { PaletteMode } from '@mui/material'
import React from 'react'
import SnackbarComponent from './components/SnackbarComponent'
import { SnackbarContextProvider } from './context/SnackbarContext'

const Layout = ({ children }: any) => {
  const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
    typography: {
      fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, sans-serif',
      button: {
        textTransform: 'none',
      },
    },
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // palette values for light mode
            primary: {
              light: '#5097cc',
              main: '#ffff',
              dark: '#003f6c',
            },
            secondary: {
              main: '#9b3806',
              light: '#d26634',
              dark: '#670300',
            },
            background: {
              default: '#fff',
              paper: '#fff',
            },
            text: {
              primary: '#383838',
              secondary: '#06699b',
            },
          }
        : {
            // palette values for dark mode
            primary: {
              light: '#ffffff',
              main: '#fff',
              dark: '#cccccc',
            },
            secondary: {
              main: '#c3d001',
              light: '#f9ff4f',
              dark: '##8e9f00',
            },
            background: {
              default: '#121212',
              paper: '#383838',
            },
            text: {
              primary: '#fff',
              secondary: '#c3d001',
            },
          }),
    },
  })

  const theme = createTheme(getDesignTokens('light'))

  return (
    <html>
      <head>
        <title>Vtes Archon</title>
      </head>
      <AuthProvider>
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
      </AuthProvider>
    </html>
  )
}

export default Layout
