'use client '

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
} from '@mui/material'
import React, { useRef, useState } from 'react'

import { PlayersTotalInfo } from '../../../../../../utils/types'
import { Profile } from '../../../../../../database/database.types'
import getPlayerInfoByVken from '../../../../../../services/getPlayerInfoByVken'

interface Props {
  tournamentId: string
  roundId: string
  addPlayer: (player: PlayersTotalInfo) => void
}
const AddPlayerForm = ({ tournamentId, roundId, addPlayer }: Props) => {
  const [showUserNotFound, setShowUserNotFound] = useState<boolean>(false)
  const vkenRef = useRef<HTMLInputElement | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const user: Profile | null = await getPlayerInfoByVken(
      vkenRef.current?.value ?? ''
    )
    if (user) {
      const newUser: PlayersTotalInfo = {
        userId: user.userId,
        username: user.username,
        full_name: user.fullName,
        vken: user.vken,
        tournamentId: tournamentId,
        VP: '0',
        GW: '0',
        minipoints: '0',
        coinflip: '0',
        round: roundId,
        tableRank: '0',
        dropped: false,
      }
      if (vkenRef.current) {
        vkenRef.current.value = ''
      }
      addPlayer(newUser)
    } else {
      if (vkenRef.current) {
        vkenRef.current.value = ''
      }
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
        <Button type="submit">Add</Button>
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
