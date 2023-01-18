'use client'

import React, { ReactElement, useEffect, useState } from 'react'

import FinalSittingOrder from './FinalSittingOrder'
import FinalUserManagement from './FinalUserManagement'
import OwnerAccessWrapper from '../../../../../components/OwnerAccessWrapper'
import PlayersContextProvider from '../../../../../context/PlayersContext'
import RoundRanking from './RoundRanking'
import RoundTableDisplay from '../../RoundTableDisplay'
import Stepper from '../../../../../components/Stepper'
import TableResultForm from '../TableResultForm'
import { Tournament } from '../../../../../../database/database.types'
import UserManagement from './UserManagement'
import getTournamentInfo from '../../../../../../services/getTournamentInfo'

const ArchonRound = ({
  params,
}: {
  params: { tournamentId: string; roundId: string }
}) => {
  const { tournamentId, roundId } = params
  const [isFinal, setIsFinal] = useState<boolean>(false)
  const [tournamentInfo, setTournamentInfo] = useState<Tournament>(
    {} as Tournament
  )
  //TODO: Incluir steps para la final

  const calculateFinal = async () => {
    const info: Tournament | null = await getTournamentInfo(tournamentId)
    if (info) {
      setIsFinal((prev) => Number(info?.numberOfRounds) === Number(roundId))
      setTournamentInfo(info)
    } else {
      setIsFinal(false)
      setTournamentInfo({} as Tournament)
    }
  }

  const finalSteps: ReactElement[] = [
    <FinalUserManagement
      tournamentInfo={tournamentInfo}
      tournamentId={tournamentId}
      roundId={roundId}
    />,
    <FinalSittingOrder/>,
  ]

  const steps: ReactElement[] = [
    <UserManagement
      tournamentInfo={tournamentInfo}
      tournamentId={tournamentId}
      roundId={roundId}
    />,
    <RoundTableDisplay />,
    <TableResultForm />,
    <RoundRanking />,
  ]
  useEffect(() => {
    calculateFinal()
  }, [roundId])

  return (
    <OwnerAccessWrapper tournamentId={tournamentId}>
      <PlayersContextProvider>
        {isFinal ? (
          <Stepper
            steps={finalSteps}
            tournamentId={tournamentId}
            roundId={roundId}
          />
        ) : (
          <Stepper
            steps={steps}
            tournamentId={tournamentId}
            roundId={roundId}
          />
        )}
      </PlayersContextProvider>
    </OwnerAccessWrapper>
  )
}

export default ArchonRound
