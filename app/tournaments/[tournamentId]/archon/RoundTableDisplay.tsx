'use client'

import { Container, List, ListItem } from '@mui/material'
import {
  PlayersTotalInfo,
  TableDistributionType,
} from '../../../../utils/types'
import React, { useEffect } from 'react'

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
  /*  const [tables5, setTables5] = useState<PlayersTotalInfo[][]>()
  const [tables4, setTables4] = useState<PlayersTotalInfo[][]>() */

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
  /*  const sortByRank = (): PlayersTotalInfo[] => {
    //TODO: TBD
    return [...playersList]
      .filter((elem) => !elem.dropped)
      .sort((a, b) => Number(b.GW) - Number(a.GW))
      .sort((a, b) => Number(b.VP) - Number(a.VP))
      .sort((a, b) => Number(b.minipoints) - Number(a.minipoints))
      .sort((a, b) => Number(b.coinflip) - Number(a.coinflip))
  } */

  const sortPlayersList = (): PlayersTotalInfo[] => {
    return [...playersList]
      .filter((elem) => !elem.dropped)
      .sort(() => Math.random() - 0.5)
  }

  const tables = () => {
    const { table4, table5 } = getTableDistributionTables()
    if (
      (tables5.length !== table5) ||
      (tables4.length !== table4)
    ) {
      const list = sortPlayersList()
      const NewTables5 = [...Array(table5)].map((elem, index) =>
        list.slice(index * 5, index * 5 + 5)
      )
      const startingTable4Index: number = table5 * 5
      const newTables4 = [...Array(table4)].map((elem, index) =>
        list.slice(
          startingTable4Index + 4 * index,
          startingTable4Index + 4 * index + 4
        )
      )
      /*  console.log('tables5', { tables5 })
    console.log('tables4', { tables4 })  */
      setTables4(newTables4)
      setTables5(NewTables5)
      return
    }
  }

  useEffect(() => {
    tables()
  }, [])

  return (
    <Container>
      <List>
        {tables5?.map((elem, index) => (
          <ListItem key={index}>
            <>
              Table {index + 1}
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

export default RoundTableDisplay
