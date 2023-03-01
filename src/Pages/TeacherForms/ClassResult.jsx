import { Button, Grid, Paper, TextField } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import * as React from 'react'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'

import useAuth from '../../Hooks/useAuth'

import { getMarksSheet } from '../../Services/API/marksSheetRequest'

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
  let [searchParams, setSearchParams] = useSearchParams()
  const session = searchParams.get('session').toLowerCase()
  const program = searchParams.get('program').toLowerCase()
  const section = searchParams.get('section').toLowerCase()
  const subject = searchParams.get('subject').toLowerCase()

  const { token } = useAuth()
  const { data } = useQuery(
    ['marks-sheet', searchParams.get('section'), searchParams.get('subject')],
    () => getMarksSheet(token, { session, program, section }),
    {
      enabled: !!token,
    },
  )

  console.log(data)
  const Session = session.toUpperCase()
  const Program = program.toUpperCase()
  const Section = section.toUpperCase()
  const Subject = subject.toUpperCase()

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
                  Final Marks
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
              {data?.map(row => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell align='left' sx={{ padding: '1%' }}>
                    {Session}-{Program}-{row.rollNo}
                  </StyledTableCell>
                  <StyledTableCell align='left' sx={{ padding: '1%' }}>
                    {row.name}
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
