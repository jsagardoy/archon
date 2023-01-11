'use client'

import React, { ReactElement } from 'react'

import OwnerAccessWrapper from '../../../../../components/OwnerAccessWrapper'
import PlayersContextProvider from '../../../../../context/PlayersContext'
import RoundTableDisplay from '../../RoundTableDisplay'
import Stepper from '../../../../../components/Stepper'
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
    <>3</>,
  ]
  return (
    <OwnerAccessWrapper tournamentId={tournamentId}>
      <PlayersContextProvider>
        <Stepper steps={steps} />
      </PlayersContextProvider>
    </OwnerAccessWrapper>
  )
}

export default ArchonRound
