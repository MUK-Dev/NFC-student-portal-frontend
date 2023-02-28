import { Button, Grid, Paper, TextField } from '@mui/material'
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

function createData(sRoll, sName) {
  return { sRoll, sName }
}

const rows = [
  createData('2K19-BSCS-301', 'Ahsan Farooq'),
  createData('2K19-BSCS-302', 'Abu Bakar Asif'),
  createData('2K19-BSCS-303', 'Faseeh Tahir'),
  createData('2K19-BSCS-304', 'Maaz Amajd'),
  createData('2K19-BSCS-305', 'Waseem Saleem'),
  createData('2K19-BSCS-306', 'Laiba Raees'),
  createData('2K19-BSCS-307', 'Areesh Ahmad'),
  createData('2K19-BSCS-308', 'Daniyal Sabir'),
  createData('2K19-BSCS-309', 'Komal Irshad'),
  createData('2K19-BSCS-310', 'Tamoor Ghani'),
]

export default function ClassResult() {
  return (
    <Grid>
      <Paper sx={{ height: '77vh' }}>
        <TableContainer sx={{ height: '100%' }}>
          <Table stickyHeader aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell
                  align='left'
                  sx={{ padding: '2%', width: '20%' }}
                >
                  Student Roll No.
                </StyledTableCell>
                <StyledTableCell
                  align='left'
                  sx={{ padding: '2%', width: '20%' }}
                >
                  Student Name
                </StyledTableCell>
                <StyledTableCell
                  align='left'
                  sx={{ padding: '2%', width: '20%' }}
                >
                  Mid Marks
                </StyledTableCell>
                <StyledTableCell
                  align='left'
                  sx={{ padding: '2%', width: '20%' }}
                >
                  Final MArks
                </StyledTableCell>
                <StyledTableCell
                  align='left'
                  sx={{ padding: '2%', width: '20%' }}
                >
                  Sessional Marks
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ overflowY: 'auto' }}>
              {rows.map(row => (
                <StyledTableRow key={row.sRoll}>
                  <StyledTableCell align='left' sx={{ padding: '1%' }}>
                    {row.sRoll}
                  </StyledTableCell>
                  <StyledTableCell align='left' sx={{ padding: '1%' }}>
                    {row.sName}
                  </StyledTableCell>
                  <StyledTableCell align='center' sx={{ padding: '1%' }}>
                    <TextField
                      id='outlined-basic'
                      label='Mid Marks'
                      variant='outlined'
                    />
                  </StyledTableCell>
                  <StyledTableCell align='center' sx={{ padding: '1%' }}>
                    <TextField
                      id='outlined-basic'
                      label='Final Marks'
                      variant='outlined'
                    />
                  </StyledTableCell>
                  <StyledTableCell align='center' sx={{ padding: '1%' }}>
                    <TextField
                      id='outlined-basic'
                      label='Sessional Marks'
                      variant='outlined'
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Button
        variant='contained'
        sx={{
          width: '100%',
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
        }}
        disableElevation
      >
        Submit
      </Button>
    </Grid>
  )
}
