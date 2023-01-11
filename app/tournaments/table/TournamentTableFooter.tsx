'use client'

import React, { useEffect } from 'react'
import { TableFooter, TablePagination, TableRow } from '@mui/material'

import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions'
import { Tournament } from '../../../database/database.types'
import page from '../page'

const TournamentTableFooter = ({
  tournaments,
  getRows,
}: {
  tournaments: Tournament[]
  getRows: (tournaments: Tournament[]) => void
}) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const calculateRows = () =>
    getRows(
      rowsPerPage > 0
        ? tournaments?.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )
        : tournaments
    )
  
    useEffect(() => {
    calculateRows()
  }, [tournaments, page, rowsPerPage])

  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          colSpan={6}
          count={tournaments?.length ?? 0}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              'aria-label': 'Rows per page',
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </TableRow>
    </TableFooter>
  )
}

export default TournamentTableFooter
