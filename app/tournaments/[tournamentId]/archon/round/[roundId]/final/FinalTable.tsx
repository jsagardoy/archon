'use client'

import { Box, Button } from '@mui/material'
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
    <Box sx={{ height: '80vh', width: 455 }}>
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

export default FinalTable
