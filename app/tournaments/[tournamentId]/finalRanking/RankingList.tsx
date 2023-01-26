'use client'

import { Box, Button, Container, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React, { useEffect } from 'react'

import { PlayersTotalInfo } from '../../../../utils/types'
import { Tournament } from '../../../../database/database.types'
import { useRouter } from 'next/navigation'

interface Props {
  ranking: PlayersTotalInfo[]
  tournamentInfo: Tournament|null
}

const RankingList = ({ ranking, tournamentInfo }: Props) => {
  const router=useRouter()
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
  const handleGoToInfo = () => {
   router.push(`/tournaments/${tournamentInfo?.tournamentId}`) 
  }
  return (
    <Container
      id="resultContainer"
      sx={{
        display: 'flex',
        width: '100%',
        heigh: '75vh',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',

          marginBottom: '0.5rem',
          marginTop: '0.5rem',
        }}
      >
        <Typography
          color="primary"
          variant="h5"
          sx={{ textDecoration: 'underline' }}
        >
          Tournament {tournamentInfo?.name} final ranking
        </Typography>
      </Box>
      <Button onClick={handleGoToInfo} sx={{border:'1px solid',marginBottom:'1rem'}}>Tournament information details</Button>
      {ranking && ranking.length > 0 ? (
        <Box sx={{ height: '64vh', width: 925 }}>
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
        <Typography variant="body1">
          Tournament final ranking not available yet.
        </Typography>
      )}
    </Container>
  )
}

export default RankingList
