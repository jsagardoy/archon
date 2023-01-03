import { AlertColor } from '@mui/material/Alert'
import { Player } from '../database/database.types'

export type AlertType = {
  open: boolean
  message: string
  severity: AlertColor
}

export type SnackbarContextType = {
  alert: AlertType
  setAlert: (value: AlertType) => void
}

export type LoginType = {
  email: string
  password: string
}
export type UserContextType = {
  userId: string
  setUserId: (value: string) => void
}

export type TournamentFilterValuesType = {
  country: string | null
  state: string | null
  city: string | null
  startDate: string | null
  endDate: string | null
}
export type PlayersList = { tournamentId: string; players: Player[] }
/* export type UserProfile = {
  id: string
  updated_at: string | null
  username: string | null
  full_name: string | null
  avatar_url: string | null
  website: string | null
  vken: string | null
  rol: string | null
} */
export type PlayersInTable = {
  id?: string
  playerId: string
  tournamentId: string
  VP: string | null
  GW: string | null
  minipoints: string | null
  coinflip: string | null
  round: string
  tableRank: string
  dropped:boolean
}
export type PlayersInTableTotalInfo = PlayersInTable & {
  userId: string | null
  username: string | null
  full_name: string | null
  vken: string | null
}