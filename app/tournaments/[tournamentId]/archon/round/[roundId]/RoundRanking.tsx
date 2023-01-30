import { Box, Button, Container, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'

import { PlayersTotalInfo } from '../../../../../../utils/types'
import usePlayersList from '../../../../../hooks/usePlayersList'

const RoundRanking = () => {
  const { setPlayersList, tables4, tables5 } = usePlayersList()
  const [newList, setNewList] = useState<PlayersTotalInfo[]>([])
  const composeRanking = (): PlayersTotalInfo[] => {
    const res = tables5.flatMap((elem) => elem)
    const res2 = tables4.flatMap((elem) => elem)

    const list: PlayersTotalInfo[] = [...res, ...res2]
    const data = createRanking(list)
    setPlayersList(data)
    return data
  }

  const createRanking = (list: PlayersTotalInfo[]): PlayersTotalInfo[] =>
    list
      .sort(
        (a: PlayersTotalInfo, b: PlayersTotalInfo) =>
          Number(b.minipoints) - Number(a.minipoints)
      )
      .sort(
        (a: PlayersTotalInfo, b: PlayersTotalInfo) =>
          Number(b.VP) - Number(a.VP)
      )
      .sort(
        (a: PlayersTotalInfo, b: PlayersTotalInfo) =>
          Number(b.GW) - Number(a.GW)
      )

  useEffect(() => {
    setNewList(composeRanking())
  }, [])

  const rows = newList.map((player, index) => ({
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
      sx={{ display: 'flex', height: '65vh', justifyContent: 'center', flexDirection:'column', alignItems:'center'}}
    >
      <Typography color="primary" variant="h5" sx={{marginBottom: '1rem'}}>
        Table results this round
      </Typography>
      <Box sx={{ height: '65vh', width: 760 }}>
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

export default RoundRanking
