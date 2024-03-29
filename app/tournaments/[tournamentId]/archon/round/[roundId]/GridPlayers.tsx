'use client'

import { Box, Button } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { PlayersTotalInfo } from '../../../../../../utils/types'
import React from 'react'

interface Props {
  playersList: PlayersTotalInfo[]
  dropPlayer: (index: number) => void
}
const GridPlayers = ({ playersList, dropPlayer }: Props) => {
  const handleDrop = (id: number) => {
    dropPlayer(id - 1)
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: '#', width: 50 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'vken', headerName: 'vken', width: 100 },
    { field: 'status', headerName: 'Status', width: 100 },
    {
      field: 'action',
      headerName: 'action',
      //TODO add behaviour to drop
      renderCell: (params) => (
        <Button onClick={() => handleDrop(params.id as number)}>
          Drop/Play
        </Button>
      ),
      width: 150,
    },
  ]
  const rows = playersList.map((player, index) => ({
    id: index + 1,
    vken: player.vken,
    name: player.username === '' ? player.full_name : player.username,
    status: player.dropped ? 'Dropped' : 'Playing',
    action: <Button>Drop</Button>,
  }))
  return (
    <Box sx={{ height: '80vh', width: 720 }}>
      <DataGrid
        columns={columns}
        rows={rows}
        initialState={{
          pagination: {
            pageSize: 25,
          },
        }}
        rowsPerPageOptions={[25, 50, 100]}
        pagination
      />
    </Box>
  )
}

export default GridPlayers
