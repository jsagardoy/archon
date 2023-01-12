'use client'

import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import React, { FormEvent, useState } from 'react'

import { PlayersTotalInfo } from '../../../../../../utils/types'

interface Props {
  table: PlayersTotalInfo[]
  tableId: number
  updateTable: (newTable: PlayersTotalInfo[], tableId: number) => void
}
const TableForm = ({ table, updateTable, tableId }: Props) => {
  const hasRepeatedVP = (list: PlayersTotalInfo[]) => {
    const vp = list.map((elem) => elem.VP)
    return !(new Set(vp).size === vp.length)
  }

  const getTotalMinipoints = (list: PlayersTotalInfo[], VP: number) => {
    return list
      .filter((elem) => Number(elem.VP) === VP)
      .map((elem) => Number(elem.minipoints))
      .reduce((acum, a) => Number(acum) + Number(a))
  }

  const minipoints4 = [
    {
      rank: 1,
      value: 60,
    },
    {
      rank: 2,
      value: 48,
    },
    {
      rank: 3,
      value: 24,
    },
    {
      rank: 4,
      value: 12,
    },
  ]

  const minipoints5 = [
    {
      rank: 1,
      value: 60,
    },
    {
      rank: 2,
      value: 48,
    },
    {
      rank: 3,
      value: 36,
    },
    {
      rank: 4,
      value: 24,
    },
    {
      rank: 5,
      value: 12,
    },
  ]

  const getMinipoints4 = (table: PlayersTotalInfo[]): PlayersTotalInfo[] =>
    rankTable(table).map((player: PlayersTotalInfo, rank: number) => {
      const minipoints = minipoints4.find((elem) => elem.rank === rank + 1)
      return {
        ...player,
        minipoints: minipoints?.value.toString() ?? '0',
      }
    })

  const getMinipoints5 = (table: PlayersTotalInfo[]): PlayersTotalInfo[] =>
    rankTable(table).map((player: PlayersTotalInfo, rank: number) => {
      const minipoints = minipoints5.find((elem) => elem.rank === rank + 1)
      return {
        ...player,
        minipoints: minipoints?.value.toString() ?? '0',
      }
    })

  const calculateMinipoints = (
    table: PlayersTotalInfo[]
  ): PlayersTotalInfo[] => {
    //no repeated VP
    if (!hasRepeatedVP(table)) {
      if (table.length === 4) {
        return getMinipoints4(table)
      }

      if (table.length === 5) {
        return getMinipoints5(table)
      }
    }
    //repeated VP
    else {
      const data =
        table.length === 5 ? getMinipoints5(table) : getMinipoints4(table)

      const VPData = data.map((data) => Number(data.VP) ?? 0)

      const count = VPData.reduce((accumulator: any, value: number) => {
        return { ...accumulator, [value]: (accumulator[value] || 0) + 1 }
      }, {})

      const result = data.map((elem) => {
        return {
          ...elem,
          minipoints: (
            getTotalMinipoints(data, Number(elem.VP)) / count[Number(elem.VP)]
          ).toString(),
        }
      })
      return result
    }
    return []
  }

  const validateTableVP = (newTable: PlayersTotalInfo[]): boolean => {
    const totalVP: number = newTable
      .map((elem) => Number(elem.VP))
      .reduce((acum, a) => acum + a)
    return totalVP <= newTable.length
  }

  const rankTable = (table: PlayersTotalInfo[]) => {
    return [...table].sort((a, b) => Number(b.VP) - Number(a.VP))
  }

  const calculateGW = (table: PlayersTotalInfo[]): PlayersTotalInfo[] => {
    if (validateTableVP(table)) {
      const newTable: PlayersTotalInfo[] = rankTable(table).map((player) => {
        if (Number(player.VP) >= 3) {
          return { ...player, GW: '1' }
        }
        if (Number(player.VP) >= 2 && Number(player.VP) < 3) {
          const filteredData = table.filter(
            (elem) => Number(elem.VP) >= 2 && Number(elem.VP) < 3
          )
          if (filteredData.length === 1) {
            return { ...player, GW: '1' }
          }
          if (filteredData.length > 1) {
            return { ...player, GW: '0' }
          }
        }
        return { ...player, GW: '0' }
      })
      return newTable
    }
    return []
  }

  const getStartingPlacement = (newTable: PlayersTotalInfo[]) => {
    return table.map(
      (elem) =>
        newTable.find((newElem) => elem.userId === newElem.userId) ?? elem
    )
  }

  const handleSelect = (e: SelectChangeEvent) => {
    const playerUserId = e.target.name
    const newVP = e.target.value as string
    const newTable = [...table].map((elem) => {
      if (elem.userId === playerUserId) {
        return { ...elem, VP: newVP as string }
      }
      return elem
    })

    const withGW: PlayersTotalInfo[] = calculateGW(newTable)
    const withMinipoints: PlayersTotalInfo[] = calculateMinipoints(withGW)
    const withStartingPlacement: PlayersTotalInfo[] =
      getStartingPlacement(withMinipoints)
    updateTable(withStartingPlacement, tableId)
  }
  //updateTable(newTable, tableId)

  return (
    <Box>
      {table.map((player) => {
        return (
          <Box key={player.userId}>
            <Box>
              {player.username !== '' && player.username
                ? player.username
                : player.full_name}
            </Box>
            <Box>
              <InputLabel id="VP_id">VP</InputLabel>
              <Select
                name={player.userId ?? ''}
                labelId="VP_id"
                value={player.VP ?? '0'}
                onChange={handleSelect}
              >
                <MenuItem value={'0'}>0</MenuItem>
                <MenuItem value={'0.5'}>0.5</MenuItem>
                <MenuItem value={'1'}>1</MenuItem>
                <MenuItem value={'1.5'}>1.5</MenuItem>
                <MenuItem value={'2'}>2</MenuItem>
                <MenuItem value={'2.5'}>2.5</MenuItem>
                <MenuItem value={'3'}>3</MenuItem>
                <MenuItem value={'3.5'}>3.5</MenuItem>
                <MenuItem value={'4'}>4</MenuItem>
                <MenuItem value={'4.5'}>4.5</MenuItem>
                <MenuItem value={'5'}>5</MenuItem>
              </Select>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

export default TableForm
