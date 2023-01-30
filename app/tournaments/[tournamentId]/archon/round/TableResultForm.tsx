'use client'

import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'

import { PlayersTotalInfo } from '../../../../../utils/types'
import React from 'react'
import TableForm from './[roundId]/TableForm'
import usePlayersList from '../../../../hooks/usePlayersList'

const TableResultForm = () => {
  const { tables5, setTables5, tables4, setTables4, playersList } =
    usePlayersList()

  const updateTable = (newTable: PlayersTotalInfo[], tableId: number) => {
    if (newTable.length === 5) {
      const newTables = [...tables5]
      newTables[tableId] = newTable
      setTables5(newTables)
    }
    if (newTable.length === 4) {
      const newTables = [...tables4]
      newTables[tableId - tables5.length-1] = newTable
      setTables4(newTables)
    }
  }
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '65vh',
      }}
    >
      {playersList.filter((elem) => !elem.dropped).length === 11 ||
      playersList.filter((elem) => !elem.dropped).length < 7 ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Typography color="error" variant="body2">
            Invalid number of active players
          </Typography>
          <Typography color="error" variant="body2">
            The number of players does not fit official tournament rules. The
            number of active players must be 8 or above and cannot be 11.
          </Typography>
          <Typography color="error" variant="body2">
            Please check the players list to ensure requirements are met.
          </Typography>
        </Box>
      ) : null}
      <List
        sx={{
          display: 'flex',
          width: '100%',
          flexWrap: 'wrap',
          flexDirection: 'row',
          gap: '1rem',
        }}
      >
        {tables5?.map((elem, index) => (
          <ListItem
            sx={{
              display: 'flex',
              width: 'fit-content',
              flexDirection: 'column',
              maxHeight: 'fit-content',
              height: 'fit-content',
              border: '1px solid',
            }}
            key={index}
          >
            <ListItemText
              sx={{ width: 'fit-content', maxHeight: '3vh' }}
              primary={
                <Typography
                  color="primary"
                  variant="subtitle1"
                  sx={{ fontWeight: 'bold' }}
                >
                  Table {index + 1}
                </Typography>
              }
            />
            <ListItemText
              sx={{
                width: 'fit-content',
              }}
              primary={
                <TableForm
                  table={elem}
                  tableId={index}
                  updateTable={updateTable}
                />
              }
            />
          </ListItem>
        ))}
      </List>
      <List
        sx={{
          display: 'flex',
          width: '100%',
          flexWrap: 'wrap',
          flexDirection: 'row',
          gap: '1rem',
        }}
      >
        {tables4?.map((elem, index) => (
          <ListItem
            sx={{
              display: 'flex',
              width: 'fit-content',
              flexDirection: 'column',
              border: '1px solid',
            }}
            key={index}
          >
            <ListItemText
              sx={{ width: 'fit-content', maxHeight: '3vh' }}
              primary={
                <Typography
                  color="primary"
                  variant="subtitle1"
                  sx={{ fontWeight: 'bold' }}
                >
                  Table {(tables5?.length ?? 0) + index + 1}
                </Typography>
              }
            />

            <ListItemText
              sx={{
                width: 'fit-content',
                maxHeight: 'fit-content',
                height: 'fit-content',
              }}
              primary={
                <TableForm
                  table={elem}
                  tableId={(tables5?.length ?? 0) + index + 1}
                  updateTable={updateTable}
                />
              }
            />
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default TableResultForm
