'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

import React from 'react'
import { UserProfile } from '../../../utils/types'

interface Props {
  profiles: UserProfile[]
}
const TournamentInfoTable = ({ profiles }: Props) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Vken</TableCell>
            <TableCell>Nickname</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {profiles.map((profile, index) => (
            <TableRow key={profile.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{profile.vken}</TableCell>
              <TableCell>
                {profile.username?.length === 0
                  ? profile.full_name
                  : profile.username}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TournamentInfoTable
