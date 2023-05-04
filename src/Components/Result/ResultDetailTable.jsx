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

function createData(subject, teacher, gpa, grade) {
  return { subject, teacher, gpa, grade }
}

const rows = [
  createData('Professional Practices', 'Mr. Kamran Abid', 2.3, 'C+'),
  createData('Human Computer Interaction', 'Mr. Ahmad Naeem', 2.4, 'C+'),
  createData('Compiler Construction', 'Maam Ujala Saleem', 2.5, 'C+'),
  createData('Game Development', 'Mr. Mustajeeb-ur-Rehman', 2.6, 'C+'),
  createData('Information Security', 'Mr. Fuzail', 2.7, 'B-'),
  createData('Final Year Project - I', 'Mr. Ahtesham Noor', 2.8, 'B-'),
]

export default function ResultDetailTable() {
  return (
    <TableContainer sx={{ height: '100%', width: '100%' }}>
      <Table stickyHeader aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='left' sx={{ padding: '2%', width: '30%' }}>
              Subject
            </StyledTableCell>
            <StyledTableCell align='left' sx={{ padding: '2%', width: '30%' }}>
              Teacher
            </StyledTableCell>
            <StyledTableCell
              align='center'
              sx={{ padding: '2%', width: '20%' }}
            >
              GPA
            </StyledTableCell>
            <StyledTableCell align='left' sx={{ padding: '2%', width: '20%' }}>
              Grade
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
                {row.gpa}
              </StyledTableCell>
              <StyledTableCell align='center' sx={{ padding: '1%' }}>
                {row.grade}
              </StyledTableCell>
            </StyledTableRow>
          ))}
          <StyledTableRow>
            <StyledTableCell
              align='left'
              sx={{ padding: '1%' }}
            ></StyledTableCell>
            <StyledTableCell align='left' sx={{ padding: '1%' }}>
              Total
            </StyledTableCell>
            <StyledTableCell align='center' sx={{ padding: '1%' }}>
              2.5
            </StyledTableCell>
            <StyledTableCell align='center' sx={{ padding: '1%' }}>
              C+
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
