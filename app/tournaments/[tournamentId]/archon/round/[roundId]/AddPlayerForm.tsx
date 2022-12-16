'use client '

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
} from '@mui/material'
import React, { useRef, useState } from 'react'

import { UserProfile } from '../../../../../../utils/types'
import getPlayerInfoByVken from '../../../../../../services/getPlayerInfoByVken'

const AddPlayerForm = () => {
  const [showUserNotFound, setShowUserNotFound] = useState<boolean>(false)
  const vkenRef = useRef<HTMLInputElement>(null)
  
    const handleSubmit = async (e: React.FormEvent) => {
    /* const newPlayers: PlayersInTable[] = players.map(
            (player: PlayerType) => ({
              playerId: player.userId ?? '',
              tournamentId: tournamentId,
              VP: '0',
              GW: '0',
              minipoints: '0',
              coinflip: '0',
              round: roundId,
              tableRank: '0',
              dropped: false,
            }) */
      e.preventDefault()
    const user: UserProfile|null = await getPlayerInfoByVken(
      vkenRef.current?.value ?? ''
    )
    if (user) {
      return user
    } else {
        setShowUserNotFound(true)
        return
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <FormControl error={showUserNotFound}>
        <TextField
          inputRef={vkenRef}
          type="number"
          label="vken"
          helperText="User must have an active account in order to be added to a tournament"
          onChange={() => {
            if (showUserNotFound) {
              setShowUserNotFound(false)
            }
          }}
        />
        <Button type="submit">Search</Button>
        {showUserNotFound && (
          <FormHelperText error={showUserNotFound}>
            User not found
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  )
}

export default AddPlayerForm
