'use client'

import React, { ReactElement, useEffect, useState } from 'react'

import FinalRoundRanking from './final/FinalRoundRanking'
import FinalSittingOrder from './final/FinalSittingOrder'
import FinalTable from './final/FinalTable'
import FinalTableResultForm from './final/FinalTableResultForm'
import FinalUserManagement from './final/FinalUserManagement'
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

  const [allowNext, setAllowNext] = useState<boolean>(true)
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

  const handleNext = (newValue: boolean) => {
    setAllowNext(newValue)
  }

  const finalSteps: ReactElement[] = [
    <FinalUserManagement
      tournamentInfo={tournamentInfo}
      tournamentId={tournamentId}
      roundId={roundId}
    />,
    <FinalSittingOrder updateNext={handleNext} />,
    <FinalTable />,
    <FinalTableResultForm updateNext={handleNext}/>,
    <FinalRoundRanking />,
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
            allowNext={allowNext}
          />
        ) : (
          <Stepper
            steps={steps}
            tournamentId={tournamentId}
            roundId={roundId}
            allowNext={true}
          />
        )}
      </PlayersContextProvider>
    </OwnerAccessWrapper>
  )
}

export default ArchonRound
