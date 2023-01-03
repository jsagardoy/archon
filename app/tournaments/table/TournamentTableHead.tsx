'use client'

import { TableCell, TableHead, TableRow } from '@mui/material'

import React from 'react'

const TournamentTableHead = () => {
  return (
    <TableHead>
      <TableRow hover selected sx={{ borderBottom: '1px solid black' }}>
        <TableCell sx={{ backgroundColor: 'darkgrey' }}>Name</TableCell>
        <TableCell sx={{ backgroundColor: 'darkgrey' }}>Date</TableCell>
        <TableCell sx={{ backgroundColor: 'darkgrey' }}>Country</TableCell>
        <TableCell sx={{ backgroundColor: 'darkgrey' }}>City</TableCell>
        <TableCell sx={{ backgroundColor: 'darkgrey' }}>Players</TableCell>
        <TableCell sx={{ backgroundColor: 'darkgrey' }}>Actions</TableCell>
      </TableRow>
    </TableHead>
  )
}

export default TournamentTableHead