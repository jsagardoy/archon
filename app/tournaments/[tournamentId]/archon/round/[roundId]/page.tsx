'use client'

import React, { ReactElement } from 'react'

import OwnerAccessWrapper from '../../../../../components/OwnerAccessWrapper'
import Stepper from '../../../../../components/Stepper'
import UserManagement from './UserManagement'

const ArchonRound = ({
  params,
}: {
  params: { tournamentId: string; roundId: string }
}) => {
  const { tournamentId, roundId } = params
  const steps:ReactElement[] = [
    <UserManagement tournamentId={tournamentId} roundId={roundId} />,<>2</>,<>3</>
  ]
  return (
    <OwnerAccessWrapper tournamentId={tournamentId}>
      <Stepper  steps={steps} />
    </OwnerAccessWrapper>
  )
}

export default ArchonRound
