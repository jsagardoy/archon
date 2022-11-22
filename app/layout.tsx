'use client'

import { Session, SessionContextProvider } from '@supabase/auth-helpers-react'

import type { AppProps } from 'next/app'
import Header from './components/Header'
import SnackbarComponent from './components/SnackbarComponent'
import { SnackbarContextProvider } from './context/SnackbarContext'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'

export default function RootLayout({
  children,
  initialSession,
}: {
  children: React.ReactNode
  initialSession: Session
}) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  return (
    <html>
      <head>
        <title>Vtes Archon</title>
      </head>
      <body>
        <SessionContextProvider
          supabaseClient={supabaseClient}
          initialSession={initialSession}
        >
          <SnackbarContextProvider>
            <header>
              <Header />
            </header>
            <main>{children}</main>
            <SnackbarComponent />
          </SnackbarContextProvider>
        </SessionContextProvider>
      </body>
    </html>
  )
}
