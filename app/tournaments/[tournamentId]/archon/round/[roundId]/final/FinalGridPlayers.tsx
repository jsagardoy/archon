'use client'

import { Box, Button } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { PlayersTotalInfo } from '../../../../../../../utils/types'
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
      headerName: 'Action',
      //TODO Hacer algo para cuando el usuario le da sin querer al drop
      renderCell: (params) => (
        params.id<=5?<Button onClick={() => handleDrop(params.id as number)}>
          Drop/Play
        </Button>:<></>
      ),
      width: 150,
    },
    { field: 'GW', headerName: 'GW', width: 50 },
    { field: 'VP', headerName: 'VP', width: 50 },
    { field: 'Minipoints', headerName: 'Minipoints', width: 100 },
    { field: 'Coinflip', headerName: 'Coinflip', width: 100 },
  ]
  const showDrop = (index: number) => index < 5
  
  const rows = playersList.map((player, index) => ({
    id: index + 1,
    vken: player.vken,
    name: player.username === '' ? player.full_name : player.username,
    status: player.dropped ? 'Dropped' : 'Playing',
    action: showDrop(index)?<Button>Drop</Button>:null,
    GW: player.GW,
    VP: player.VP,
    Minipoints: player.minipoints,
    Coinflip: player.coinflip,
  }))
  return (
    <Box sx={{ height: '80vh', width: 1025 }}>
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
