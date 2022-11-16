import Header from './components/Header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <title>Vtes Archon</title>
      </head>
      <body>
        <header>
          <Header />
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
