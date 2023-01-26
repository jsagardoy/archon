'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

import { Profile } from '../../../database/database.types'
import React from 'react'

interface Props {
  profiles: Profile[]
}
const TournamentInfoTable = ({ profiles }: Props) => {
  return (
    <TableContainer sx={{display:'flex', height:'65vh'}}>
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
            <TableRow key={profile.userId}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{profile.vken}</TableCell>
              <TableCell>
                {profile.username?.length === 0
                  ? profile.fullName
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
