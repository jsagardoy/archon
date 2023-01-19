'use client'

import { AlertType, PlayersTotalInfo } from '../../../../../../../utils/types'
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import React, { FormEvent, useState } from 'react'

import usePlayersList from '../../../../../../hooks/usePlayersList'
import useSnackbar from '../../../../../../hooks/useSnackbar'

const FinalTableForm = () => {
  const { setAlert } = useSnackbar()
  const { playersList, setPlayersList } = usePlayersList()
  const [table, setTable] = useState<PlayersTotalInfo[]>(
    playersList
      .map((elem) => ({
        ...elem,
        GW: '0',
        VP: '0',
        minipoints: '0',
      }))
      .slice(0, 5)
  )

  const validateTableVP = (): boolean => {
    const totalVP: number = table
      .map((elem) => Number(elem.VP))
      .reduce((acum, a) => acum + a)
    return totalVP <= table.length
  }

  const getTableRanking = () => {
    const Vp: number[] = table.map((elem) => Number(elem.VP ?? '0'))
    const max = Vp.reduce((a, b) => Math.max(a, b), -Infinity)
    const top = table.filter((elem) => elem.VP === max.toString())
    return top
  }

  const rankTable = (): PlayersTotalInfo[] => {
    const data = getTableRanking()
    if (data.length === 1) {
      return [...table].sort((a, b) => Number(b.VP) - Number(a.VP))
    } else {
      const list = window.sessionStorage.getItem('final')
      if (list) {
        const startingOrder: PlayersTotalInfo[] = JSON.parse(
          list
        ) as PlayersTotalInfo[]
        startingOrder.map((elem, index) => ({ ...elem, tableRank: index }))

        const middleTable = [...table].map((elem) => {
          const value =
            startingOrder.find((elem2) => elem.userId === elem2.userId) ?? elem
          return { ...elem, tableRank: value.tableRank }
        })

        const newTable: PlayersTotalInfo[] = middleTable
          .sort((a, b) => Number(b.VP) - Number(a.VP))
          .sort((a, b) => Number(a.tableRank) - Number(b.tableRank))

        return newTable
      }
      return table
    }
  }

  const calculateGW = (): PlayersTotalInfo[] => {
    if (validateTableVP()) {
      const newTable: PlayersTotalInfo[] = rankTable().map((player) => {
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

  const handleSelect = (e: SelectChangeEvent) => {
    const playerUserId = e.target.name
    const newVP = e.target.value as string
    const newTable = [...table].map((elem) => {
      if (elem.userId === playerUserId) {
        return { ...elem, VP: newVP as string }
      }
      return elem
    })
    setTable(newTable)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const withGW: PlayersTotalInfo[] = calculateGW()

    if (withGW.length === 0) {
      const newAlert: AlertType = {
        open: true,
        message: `Invalid amount of VP for the Final`,
        severity: 'error',
      }
      setAlert(newAlert)
    } else {
      setTable(withGW)
      setPlayersList(withGW)
    }
  }
  return (
    <Box component="form" onSubmit={handleSubmit}>
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
      <Button type="submit">Submit</Button>
    </Box>
  )
}

export default FinalTableForm
