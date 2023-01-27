'use client'

import { List, ListItem, ListItemText } from '@mui/material'

import { PlayersTotalInfo } from '../../../../utils/types'
import React from 'react'

interface Props {
  playersList: PlayersTotalInfo[]
}
const TableList = ({ playersList }: Props) => {
  return (
    <List sx={{ width: '100%' }}>
      {playersList.map((player, index) => (
        <ListItem
          sx={{
            display: 'flex',
            border: '1px solid',
            gap: '0.5rem',
            justifyContent: 'flex-start',
            textAlign: 'start',
          }}
          key={index}
        >
          <ListItemText
            sx={{ maxWidth: '0.5rem' }}
            secondary={`${index + 1}`}
          />
          <ListItemText
            primary={
              player.username && player.username !== ''
                ? player.username
                : player.full_name
            }
          />
        </ListItem>
      ))}
    </List>
  )
}

export default TableList
