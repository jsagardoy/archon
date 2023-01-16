'use client'

import React, { ReactElement } from 'react'

import OwnerAccessWrapper from '../../../../../components/OwnerAccessWrapper'
import PlayersContextProvider from '../../../../../context/PlayersContext'
import RoundRanking from './RoundRanking'
import RoundTableDisplay from '../../RoundTableDisplay'
import Stepper from '../../../../../components/Stepper'
import TableResultForm from '../TableResultForm'
import UserManagement from './UserManagement'

const ArchonRound = ({
  params,
}: {
  params: { tournamentId: string; roundId: string }
}) => {
  const { tournamentId, roundId } = params
  //TODO: Incluir resto de steps
  const steps: ReactElement[] = [
    <UserManagement tournamentId={tournamentId} roundId={roundId} />,
    <RoundTableDisplay />,
    <TableResultForm />,
    <RoundRanking />,
  ]
  return (
    <OwnerAccessWrapper tournamentId={tournamentId}>
      <PlayersContextProvider>
        <Stepper steps={steps} tournamentId={tournamentId} roundId={roundId} />
      </PlayersContextProvider>
    </OwnerAccessWrapper>
  )
}

export default ArchonRound
