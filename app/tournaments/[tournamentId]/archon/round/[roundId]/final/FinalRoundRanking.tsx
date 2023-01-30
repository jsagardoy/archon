import { Box, Button, Container, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'

import { PlayersTotalInfo } from '../../../../../../../utils/types'
import usePlayersList from '../../../../../../hooks/usePlayersList'

const FinalRoundRanking = () => {
  const { playersList } = usePlayersList()

  const rows = playersList.map((player, index) => ({
    id: index + 1,
    vken: player.vken,
    name: player.username === '' ? player.full_name : player.username,
    status: player.dropped ? 'Dropped' : 'Playing',
    GW: player.GW ?? '0',
    VP: player.VP ?? '0',
    Minipoints: player.minipoints ?? '0',
  }))
  const columns: GridColDef[] = [
    { field: 'id', headerName: '#', width: 50 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'vken', headerName: 'vken', width: 100 },
    { field: 'status', headerName: 'Status', width: 100 },
    { field: 'GW', headerName: 'GW', width: 50 },
    { field: 'VP', headerName: 'VP', width: 50 },
    { field: 'Minipoints', headerName: 'Minipoints', width: 100 },
  ]
  return (
    <Container
      sx={{
        height: '65vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography color='primary' variant='h5'>Final table results</Typography>
      <Box sx={{ height: '60vh', width: 765 }}>
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

export default FinalRoundRanking
