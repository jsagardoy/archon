'use client'

import './componentStyles/body.css'

import { ThemeOptions, ThemeProvider, createTheme } from '@mui/material'

import AuthProvider from './context/AuthContext'
import { CookiesProvider } from 'react-cookie'
import Footer from './components/Footer'
import Header from './components/Header'
import { PaletteMode } from '@mui/material'
import React from 'react'
import SnackbarComponent from './components/SnackbarComponent'
import { SnackbarContextProvider } from './context/SnackbarContext'
import { darkViolet } from './componentStyles/colors'

const Layout = ({ children }: any) => {
  const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
    typography: {
      fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, sans-serif',
      button: {
        textTransform: 'none',
        fontSize: 20,
      },
    },
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // palette values for light mode
            primary: {
              light: '#5097cc',
              main: darkViolet,
              dark: '#003f6c',
            },
            secondary: {
              main: '#ffff',
              light: '#ffff',
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
        <body className="body">
          <ThemeProvider theme={theme}>
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
          <footer>
          <Footer/>
        </footer>
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  )
}

export default Layout
