'use client'

import { AlertType, PlayersTotalInfo } from '../../../../../../../utils/types'
import {
  Box,
  Button,
  Container,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import React, { FormEvent, useEffect, useState } from 'react'

import usePlayersList from '../../../../../../hooks/usePlayersList'
import useSnackbar from '../../../../../../hooks/useSnackbar'

const FinalSittingOrder = () => {
  const { playersList, setPlayersList } = usePlayersList()
  const { setAlert } = useSnackbar()
  const initialOrder = [...playersList]
    .filter((elem) => !elem.dropped)
    .slice(0, 5)
    .map((elem) => ({ userId: elem.userId ?? '', value: 1 }))
  const [order, setOrder] =
    useState<{ userId: string; value: number }[]>(initialOrder)

  const getData = () => {
    const data = order
      .sort((a, b) => a.value - b.value)
      .map(
        (elem) =>
          playersList.find(
            (elem2) => elem2.userId === elem.userId
          ) as PlayersTotalInfo
      )

    setPlayersList(data)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (validateTable()) {
      getData()
    } else {
      const newAlert: AlertType = {
        open: true,
        message:
          'Invalid data. Sitting order value repeated or not introduced. Please check sitting order values so they are unique and filled',
        severity: 'error',
      }
      setAlert(newAlert)
    }
  }

  const validateTable = () => {
    const newSet = new Set(
      order.map((elem: { userId: string; value: number }) => elem.value)
    )
    return newSet.size === order.length && order.length === 5
  }

  const handleSelectChange = (e: SelectChangeEvent) => {
    const id = e.target.name
    const value = Number(e.target.value)
    const newOrder: { userId: string; value: number } = {
      userId: id,
      value: value,
    }
    const index = order.findIndex((elem) => elem.userId === id)
    if (index === -1) {
      setOrder((prev) => [...prev, newOrder])
    } else {
      const newData = [...order]
      newData[index] = newOrder
      setOrder((prev) => newData)
    }
  }

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit}>
        <List>
          {playersList
            .filter((elem) => !elem.dropped)
            .slice(0, 5)
            .map((player, index) => (
              <ListItem key={player.vken}>
                <Box>{index + 1}</Box>
                <Box>
                  {player.username || player.username !== ''
                    ? player.username
                    : player.full_name}
                </Box>
                <Box>{player.vken}</Box>
                <InputLabel id="sittingOrderLabel">Sitting order</InputLabel>
                <Select
                  name={player.userId ?? ''}
                  onChange={handleSelectChange}
                  labelId="sittinOrderLabel"
                  value={String(order[index].value)}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </ListItem>
            ))}
        </List>
        <Button type="submit">Save Order</Button>
      </Box>
    </Container>
  )
}

export default FinalSittingOrder
