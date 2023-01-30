'use client'

import { Box, Button, Container, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React, { useEffect } from 'react'

import usePlayersList from '../../../../../../hooks/usePlayersList'

const FinalTable = () => {
  const { playersList, setPlayersList } = usePlayersList()

  const calculateFirst = () => {
    const min = 0
    const max = 4
    const index = Math.round(Math.random() * max + min)
    return index
  }

  const arrangeNewList = () => {
    const index = calculateFirst()
    const newPlayerList = [
      ...playersList.slice(index),
      ...playersList.slice(0, index),
    ]
    setPlayersList(newPlayerList)
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: '#', width: 50 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'vken', headerName: 'vken', width: 100 },
  ]

  const rows = playersList.map((player, index) => ({
    id: index + 1,
    name: player.username === '' ? player.full_name : player.username,
    vken: player.vken,
  }))

  useEffect(() => {
    arrangeNewList()
  }, [])

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',

        alignItems: 'center',
        width: '100%',
        height: '65vh',
      }}
    >
      <Typography sx={{ m: '1rem' }} color="primary" variant="h5">
        Final sitting and starting order
      </Typography>
      <Box sx={{ height: '32.3vh', width: 465, maxHeight:'fit-content' }}>
        <DataGrid columns={columns} rows={rows} hideFooter />
      </Box>
    </Container>
  )
}

export default FinalTable
