'use client'

import { Container } from '@mui/material'
import HomeCard from './components/HomeCard'
import React from 'react'
import { useAuth } from './hooks/useAuth'

const HomeData = () => {
  const nosfeURL: string =
    'https://1.bp.blogspot.com/-bgn0IGruYgk/Xps-ko8WjpI/AAAAAAACX-o/N9nPOb1iOcYdEZkWkiyNl585lkuebv3pwCLcBGAsYHQ/s640/Erica-Danell-VTES-SchreckNET.jpg'
  const tournamentDescription = 'Tournaments list'
  const tournamentsURL = '/tournaments'
  const profileURL = '/profile'
  const loginDescription =
    'Welcome to my house! Enter freely. Go safely, and leave something of the happiness you bring. - Bram Stoker'
  const loginImg =
    'https://cdn.britannica.com/55/182855-131-79CC9BF8/Max-Schreck-Nosferatu-Murnau-FW.jpg'
  const loginURL = '/login'
  const { user } = useAuth()

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '100%',
        gap: '1rem',
        height: '80vh',
      }}
    >
      <HomeCard
        imgURL={nosfeURL}
        alt={'Nosferatu accessing to a computer'}
        title={'Tournaments'}
        detail={tournamentDescription}
        URL={tournamentsURL}
      />
      {user && (
        <HomeCard
          imgURL={user?.photoURL ?? 'https://i.stack.imgur.com/34AD2.jpg'}
          alt={'User profile'}
          title={`User's profile`}
          detail={`Edit your user's profile`}
          URL={profileURL}
        />
      )}
      <HomeCard
        imgURL={loginImg}
        alt={'Nosferatu movie scene'}
        title={'Login/Logout'}
        detail={'Login/logout page'}
        URL={loginURL}
      />
    </Container>
  )
}

export default HomeData
