'use client'

import {
  Box,
  Container,
  List,
  ListItem,
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
      console.log({ newTables })
      setTables5(newTables)
    }
    if (newTable.length === 4) {
      const newTables = [...tables4]
      newTables[tableId] = newTable
      console.log({ newTables })
      setTables5(newTables)
    }
  }
  return (
    <Container>
      {playersList.filter((elem) => !elem.dropped).length === 11 ||
      playersList.filter((elem) => !elem.dropped).length < 7 ? (
        <Box>
          <Typography variant="body2">
            Invalid number of active players
          </Typography>
          <Typography variant="body2">
            The number of players does not fit official tournament rules. The
            number of active players must be 8 or above and cannot be 11.
          </Typography>
          <Typography variant="body2">
            Please check the players list to ensure the requirements are met.
          </Typography>
        </Box>
      ) : null}
      <List>
        {tables5?.map((elem, index) => (
          <ListItem key={index}>
            <>
              Table {index + 1}
              <TableForm
                table={elem}
                tableId={index}
                updateTable={updateTable}
              />
            </>
          </ListItem>
        ))}
      </List>
      <List>
        {tables4?.map((elem, index) => (
          <ListItem key={index}>
            <>
              Table {(tables5?.length ?? 0) + index + 1}
              <List>
                {elem.map((player, index) => (
                  <ListItem key={index}>
                    {index + 1} -{' '}
                    {player.username && player.username !== ''
                      ? player.username
                      : player.full_name}
                  </ListItem>
                ))}
              </List>
            </>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default TableResultForm
