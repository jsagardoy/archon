'use client'

import OwnerAccessWrapper from '../../../../../components/OwnerAccessWrapper'
import React from 'react'
import UserManagement from './UserManagement'

const ArchonRound = ({
  params,
}: {
  params: { tournamentId: string; roundId: string }
}) => {
  const { tournamentId, roundId } = params
  return (
    <OwnerAccessWrapper tournamentId={tournamentId}>
      <UserManagement tournamentId={tournamentId} roundId={roundId} />
    </OwnerAccessWrapper>
  )
}

export default ArchonRound
