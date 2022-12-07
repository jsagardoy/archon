import React from 'react'
import TournamentInfo from './TournamentInfo'

const Tournament = ({ params }: { params: { tournamentId: string } }) => {
  const { tournamentId } = params
  return <TournamentInfo tournamentId={tournamentId} />
}

export default Tournament
