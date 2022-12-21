'use client'

import React, { useState } from 'react'

import Header from './components/Header'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import SideMenu from './components/SideMenu'
import SnackbarComponent from './components/SnackbarComponent'
import { SnackbarContextProvider } from './context/SnackbarContext'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'

export default function Layout() {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  return (
    <html>
      <head>
        <title>Vtes Archon</title>
      </head>
      <SnackbarContextProvider>
        <SessionContextProvider
          supabaseClient={supabaseClient}
          initialSession={null}
        >
          <body>
            <header>
              <Header />
            </header>
            <main>
         {/*     <SideMenu /> */}
              <SnackbarComponent />
            </main>
          </body>
        </SessionContextProvider>
      </SnackbarContextProvider>
    </html>
  )
}
