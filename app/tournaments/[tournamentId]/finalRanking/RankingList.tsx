import { PlayersTotalInfo } from '../../../../utils/types'
import React from 'react'

interface Props {
  ranking: PlayersTotalInfo[]
}

const RankingList = ({ ranking }: Props) => {
  return (
    <>
      {ranking.map((elem, index) => (
        <ul key={index}>
          <li>
            {index>=1 && index<=4?2:index + 1} -{' '}
            {elem.username !== '' ? elem.username : elem.full_name}
          </li>
        </ul>
      ))}
    </>
  )
}

export default RankingList
