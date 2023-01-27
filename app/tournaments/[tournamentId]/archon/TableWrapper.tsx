'use client'

import { Box, List, ListItem, Typography } from '@mui/material'

import { PlayersTotalInfo } from '../../../../utils/types'
import React from 'react'
import TableList from './TableList'

interface Props {
  tables: PlayersTotalInfo[][]
  startingIndex: number
}
const TableWrapper = ({ tables, startingIndex }: Props) => {
  return (
    <List
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
      }}
    >
      {tables?.map((elem, index) => (
        <ListItem sx={{ width: 'fit-content' }} key={index}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
            key={index}
          >
            <Typography
              color="primary"
              variant="subtitle1"
              sx={{ fontWeight: 'bold' }}
            >
              Table {startingIndex + index + 1}
            </Typography>
            <TableList playersList={elem} />
          </Box>
        </ListItem>
      ))}
    </List>
  )
}

export default TableWrapper
