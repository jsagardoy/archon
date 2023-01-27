'use client'

import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import {
  PlayersTotalInfo,
  TableDistributionType,
} from '../../../../utils/types'
import React, { useEffect } from 'react'

import TableList from './TableList'
import TableWrapper from './TableWrapper'
import usePlayersList from '../../../hooks/usePlayersList'

const RoundTableDisplay = () => {
  const {
    playersList,
    setPlayersList,
    tables5,
    setTables5,
    tables4,
    setTables4,
  } = usePlayersList()

  const getTableDistributionTables = (): TableDistributionType => {
    const numberOfPlayers = playersList.filter((elem) => !elem.dropped).length
    if (numberOfPlayers > 7 && numberOfPlayers !== 11) {
      const rest5: number = numberOfPlayers % 5
      if (rest5 === 0) {
        return { table5: Math.trunc(numberOfPlayers / 5), table4: 0 }
      }
      if (rest5 === 4) {
        return { table5: Math.trunc(numberOfPlayers / 5), table4: 1 }
      }
      if (rest5 === 3) {
        const calculatedTable5 = Math.trunc(numberOfPlayers / 5) - 1
        const calculatedTable4 = (rest5 + 5) / 4
        const result = {
          table5: calculatedTable5,
          table4: calculatedTable4,
        }
        return result
      }
      if (rest5 === 2) {
        const calculatedTable5 = Math.trunc(numberOfPlayers / 5) - 2
        const calculatedTable4 = (rest5 + 5 * 2) / 4
        const result = {
          table5: calculatedTable5,
          table4: calculatedTable4,
        }

        return result
      }

      if (rest5 === 1) {
        const calculatedTable5 = Math.trunc(numberOfPlayers / 5) - 3
        const calculatedTable4 = (rest5 + 5 * 3) / 4
        const result = {
          table5: calculatedTable5,
          table4: calculatedTable4,
        }

        return result
      }
    }
    return { table4: 0, table5: 0 }
  }

  const sortPlayersList = (): PlayersTotalInfo[] => {
    return [...playersList]
      .filter((elem) => !elem.dropped)
      .sort(() => Math.random() - 0.5)
  }

  const clearTablesVP = (
    newTable: PlayersTotalInfo[][]
  ): PlayersTotalInfo[][] => {
    return newTable.map((elem) =>
      elem.map((elem2) => ({ ...elem2, VP: '0', GW: '0', minipoints: '0' }))
    )
  }

  const tables = () => {
    const { table4, table5 } = getTableDistributionTables()
    if (tables5.length !== table5 || tables4.length !== table4) {
      const list = sortPlayersList()
      const newTables5 = [...Array(table5)].map((elem, index) =>
        list.slice(index * 5, index * 5 + 5)
      )
      const startingTable4Index: number = table5 * 5
      const newTables4 = [...Array(table4)].map((elem, index) =>
        list.slice(
          startingTable4Index + 4 * index,
          startingTable4Index + 4 * index + 4
        )
      )

      setTables4(clearTablesVP(newTables4))
      setTables5(clearTablesVP(newTables5))
      return
    }
  }

  useEffect(() => {
    tables()
  }, [])

  return (
    <Container
      id="TablesContainer"
      sx={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        height: '65vh',
        justifyContent: 'flex-start',
        textAlign: 'center',
        flexWrap: 'wrap',
        overflowY: 'auto',
      }}
    >
      {playersList.filter((elem) => !elem.dropped).length === 11 ||
      playersList.filter((elem) => !elem.dropped).length < 7 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
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
      <Box>
        <TableWrapper tables={tables5} startingIndex={0} />
      </Box>
      <Box>
        <TableWrapper tables={tables4} startingIndex={tables5?.length} />
      </Box>
    </Container>
  )
}

export default RoundTableDisplay
