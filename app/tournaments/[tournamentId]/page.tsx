import React from 'react'
import TournamentInfo from './TournamentInfo'

const TournamentPage = ({ params }: { params: { tournamentId: string } }) => {
  const { tournamentId } = params
  return <TournamentInfo tournamentId={tournamentId} />
}

export default TournamentPage
