'use client'

import { Box, Container } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { PlayersTotalInfo } from '../../../../utils/types'
import React from 'react'
import getFinalRound from '../../../../services/getFinalRound'

interface Props {
  ranking: PlayersTotalInfo[]
}

const RankingList = ({ ranking }: Props) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: '#', width: 50 , hide:true },
    { field: 'ranking', headerName: 'Ranking', width: 100 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'vken', headerName: 'vken', width: 100 },
    { field: 'status', headerName: 'Status', width: 100 },
    { field: 'GW', headerName: 'GW', width: 50 },
    { field: 'VP', headerName: 'VP', width: 50 },
  ]
  const rows = ranking.map((player, index) => ({
    id: index + 1,
    ranking: index >= 1 && index <= 4 ? 2 : index + 1,
    vken: player.vken,
    name: player.username === '' ? player.full_name : player.username,
    status: player.dropped ? 'Dropped' : 'Playing',
    GW: player.GW,
    VP: player.VP,
  }))
  return (
    <Container>
      <Box sx={{ height: '80vh', width: 705 }}>
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
    </Container>
  )
}

export default RankingList
