import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import * as React from 'react'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

function createData(subject, teacher, hours) {
  return { subject, teacher, hours }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0),
  createData('Desin and Analysis of Algorithm', "Ma'am Ujala Saleem", '3 + 1'),
  createData('Eclair', 262, 16.0),
  createData('Cupcake', 305, 3.7),
  createData('Gingerbread', 356, 16.0),
  createData('Frozen yoghurt', 159, 6.0),
  createData('Desin and Analysis of Algorithm', "Ma'am Ujala Saleem", '3 + 1'),
]

export default function SemesterDetailTable() {
  return (
    <TableContainer sx={{ height: '100%', width: '100%' }}>
      <Table stickyHeader aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='left' sx={{ padding: '2%', width: '40%' }}>
              Subject
            </StyledTableCell>
            <StyledTableCell align='left' sx={{ padding: '2%', width: '40%' }}>
              Teacher
            </StyledTableCell>
            <StyledTableCell
              align='center'
              sx={{ padding: '2%', width: '40%' }}
            >
              Hours
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ overflowY: 'auto' }}>
          {rows.map(row => (
            <StyledTableRow key={row.subject}>
              <StyledTableCell align='left' sx={{ padding: '1%' }}>
                {row.subject}
              </StyledTableCell>
              <StyledTableCell align='left' sx={{ padding: '1%' }}>
                {row.teacher}
              </StyledTableCell>
              <StyledTableCell align='center' sx={{ padding: '1%' }}>
                {row.hours}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
