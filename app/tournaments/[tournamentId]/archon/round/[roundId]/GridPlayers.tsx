'use client'

import { Box, Button } from '@mui/material'
import { DataGrid, GridApi, GridColDef } from '@mui/x-data-grid'

import { PlayersInTableTotalInfo } from '../../../../../../utils/types'
import React from 'react'

interface Props {
  playersList: PlayersInTableTotalInfo[]
}
const GridPlayers = ({ playersList }: Props) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: '#', width: 200 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'vken', headerName: 'vken', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
    {
      field: 'action',
      headerName: 'action',
      //TODO add behaviour to drop
      renderCell: (params) => <Button onClick={()=>console.log('drop'+params.id)}>Drop/Play</Button>,
      width: 200,
    },
  ]
  const rows = playersList.map((player, index) => ({
    id: index + 1,
    vken: player.vken,
    name: player.username === '' ? player.full_name : player.username,
    status: player.dropped?'Dropped':'Playing',
    action: <Button>Drop</Button>,
  }))
  return (
    <Box sx={{ height: '60vh', width: '100%' }}>
      <DataGrid columns={columns} rows={rows} />
    </Box>
  )
}

export default GridPlayers
