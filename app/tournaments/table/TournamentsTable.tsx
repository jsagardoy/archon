import {
  AlertType,
  PlayersList,
  TournamentFilterValuesType,
} from '../../../utils/types'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import { Player, Tournament } from '../../../database/database.types'
import React, { useEffect, useState } from 'react'

import TablePaginationActions from '../../components/TablePaginationActions'
import TournamentTableBody from './TournamentTableBody'
import TournamentTableFooter from './TournamentTableFooter'
import TournamentTableHead from './TournamentTableHead'
import { User } from 'firebase/auth'
import addPlayerToTournament from '../../../services/addPlayerToTournament'
import getTournamentPlayers from '../../../services/getTournamentPlayers'
import { isAlreadySubscribed } from '../../../utils/funtions'
import page from '../../page'
import removePlayerFromTournament from '../../../services/removePlayerFromTournament'
import { useAuth } from '../../hooks/useAuth'
import { useRouter } from 'next/navigation'
import useSession from '../../hooks/useSession'
import useSnackbar from '../../hooks/useSnackbar'

const TournamentsTable = ({
  tournaments,
  filters,
  playersList,
  updatePlayers,
}: {
  tournaments: Tournament[]
  filters: TournamentFilterValuesType
  playersList: PlayersList[]
  updatePlayers: (newPlayersList: PlayersList[]) => void
}) => {
  const [rows, setRows] = useState<Tournament[]>([])
  const getRows = (newTournaments: Tournament[]) => {
    setRows(newTournaments)
  }
  return (
    <TableContainer>
      <Table>
        <TournamentTableHead />
        <TournamentTableBody
          filters={filters}
          playersList={playersList}
          updatePlayers={updatePlayers}
          rows={rows}
        />
        <TournamentTableFooter tournaments={tournaments} getRows={getRows} />
      </Table>
    </TableContainer>
  )
}

export default TournamentsTable
