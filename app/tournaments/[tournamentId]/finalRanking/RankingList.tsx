'use client'

import { Box, Container, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { PlayersTotalInfo } from '../../../../utils/types'
import React from 'react'
import getFinalRound from '../../../../services/getFinalRound'

interface Props {
  ranking: PlayersTotalInfo[]
}

const RankingList = ({ ranking }: Props) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: '#', width: 50, hide: true },
    { field: 'ranking', headerName: 'Ranking', width: 100 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'vken', headerName: 'vken', width: 100 },
    { field: 'status', headerName: 'Status', width: 100 },
    { field: 'GW', headerName: 'GW', width: 50 },
    { field: 'VP', headerName: 'VP', width: 50 },
    { field: 'minipoints', headerName: 'Minipoints', width: 100 },
    { field: 'coinflip', headerName: 'Coinflip', width: 100 },
  ]
  const rows = ranking.map((player, index) => ({
    id: index + 1,
    ranking: index >= 1 && index <= 4 ? 2 : index + 1,
    vken: player.vken,
    name: player.username === '' ? player.full_name : player.username,
    status: player.dropped ? 'Dropped' : 'Playing',
    GW: player.GW,
    VP: player.VP,
    minipoints: player.minipoints,
    coinflip: player.coinflip,
  }))
  return (
    <Container>
      <Typography variant="h5">Tournament final ranking</Typography>
      {ranking && ranking.length > 0 ? (
        <Box sx={{ height: '80vh', width: 905 }}>
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
      ) : (
        <Typography variant="caption">Tournament ranking not available.</Typography>
      )}
    </Container>
  )
}

export default RankingList
