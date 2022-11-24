import PrivateComponent from '../components/PrivateComponent'
import React from 'react'
import TournamentList from './TournamentList'

const Tournaments = () => {
  return (
    <PrivateComponent>
      <TournamentList />
    </PrivateComponent>
  )
}

export default Tournaments
