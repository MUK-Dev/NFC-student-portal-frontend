import { Search } from '@mui/icons-material'
import {
  FormControl,
  Grid,
  InputAdornment,
  LinearProgress,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import * as React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'

import useAuth from '../../Hooks/useAuth'

import { getResultSheetByIdRequest } from '../../Services/API/getResultSheetByIdRequest'

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

export default function HeadResultSheet() {
  const { user, token } = useAuth()
  let [searchParams, setSearchParams] = useSearchParams()
  const sheetId = searchParams.get('sheetId')
  const [studentsList, setStudentsList] = useState([])
  const [search, setSearch] = useState('')
  const [proSession, setProSession] = useState({
    Program: '',
    Session: '',
    Section: '',
    Subject: '',
  })
  const [subjectID, setSubjectID] = useState({
    Subject: '',
    theory_hours: '',
    lab_hours: '',
  })

  const {
    isLoading: isSheetLoading,
    isError: isSheetError,
    data: sheetData,
  } = useQuery(
    ['sheet', sheetId, token],
    () => getResultSheetByIdRequest(token, sheetId),
    {
      staleTime: 1000 * 60 * 60 * 24,
    },
  )

  useEffect(() => {
    if (isSheetError || isSheetLoading) return
    setStudentsList(sheetData.list)
    setProSession({
      Program: sheetData.program_abbreviation,
      Session: sheetData.session_title,
      Section: sheetData.section_title,
      Subject: sheetData.subject_title,
    })
    setSubjectID({
      Subject: sheetData.subject_Id,
      theory_hours: parseInt(sheetData.theory_hours),
      lab_hours: parseInt(sheetData.lab_hours),
    })
  }, [sheetData])
  const selectedSubject = subjectID

  const dataList =
    !isSheetLoading &&
    !!studentsList &&
    studentsList
      ?.filter(r => {
        if (search === '') return true
        else if (
          r?.student.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
          r?.student?.rollNo?.toLowerCase()?.includes(search?.toLowerCase())
        )
          return true
      })
      ?.map(row => (
        <StyledTableRow key={row._id}>
          <StyledTableCell align='left' sx={{ padding: '1%' }}>
            {proSession.Session}-{proSession.Program}-{row.student.rollNo}
          </StyledTableCell>
          <StyledTableCell align='left' sx={{ padding: '1%' }}>
            {row.student.name}
          </StyledTableCell>
          {selectedSubject?.theory_hours > 0 && (
            <>
              <StyledTableCell align='center' sx={{ padding: '1%' }}>
                <TextField
                  id='outlined-basic'
                  label='Mid Marks'
                  variant='outlined'
                  placeholder='< 30'
                  value={row.mids}
                  disabled
                  onChange={e => setValue(row._id, e.target.value, 'mids')}
                />
              </StyledTableCell>
              <StyledTableCell align='center' sx={{ padding: '1%' }}>
                <TextField
                  id='outlined-basic'
                  label='Final Marks'
                  variant='outlined'
                  placeholder='< 50'
                  value={row.finals}
                  disabled
                  onChange={e => setValue(row._id, e.target.value, 'finals')}
                />
              </StyledTableCell>
              <StyledTableCell align='center' sx={{ padding: '1%' }}>
                <TextField
                  id='outlined-basic'
                  label='Sessional Marks'
                  variant='outlined'
                  placeholder='< 20'
                  value={row.sessional}
                  disabled
                  onChange={e => setValue(row._id, e.target.value, 'sessional')}
                />
              </StyledTableCell>
            </>
          )}
          {selectedSubject?.lab_hours > 0 && (
            <>
              <StyledTableCell align='center' sx={{ padding: '1%' }}>
                <TextField
                  id='outlined-basic'
                  label='Lab Final Marks'
                  variant='outlined'
                  placeholder='< 50'
                  value={row.lab_final}
                  disabled
                  onChange={e => setValue(row._id, e.target.value, 'lab_final')}
                />
              </StyledTableCell>
              <StyledTableCell align='center' sx={{ padding: '1%' }}>
                <TextField
                  id='outlined-basic'
                  label='Lab Sessional Marks'
                  variant='outlined'
                  placeholder='< 50'
                  value={row.lab_sessional}
                  disabled
                  onChange={e =>
                    setValue(row._id, e.target.value, 'lab_sessional')
                  }
                />
              </StyledTableCell>
            </>
          )}
        </StyledTableRow>
      ))

  return (
    <>
      <Grid>
        <Paper sx={{ height: '80vh', position: 'relative' }}>
          {isSheetLoading && (
            <LinearProgress
              sx={{
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />
          )}
          <Grid
            sx={{ height: '10%' }}
            container
            justifyContent='space-between'
            alignItems='center'
            padding='0.5em'
          >
            <Grid item>
              <Typography
                variant='h6'
                sx={{ textAlign: { xs: 'center', md: 'left' } }}
                gutterBottom
              >
                Section {proSession.Section?.toUpperCase()} Marks{' '}
                <span style={{ padding: '0 0.75em' }}> {'=>'} </span>
                Subject: {proSession.Subject}
              </Typography>
            </Grid>
            <Grid item>
              <FormControl
                sx={{ width: { xs: '100%', md: '20ch' } }}
                size='small'
                variant='outlined'
              >
                <OutlinedInput
                  size='small'
                  value={search}
                  endAdornment={
                    <InputAdornment position='end'>
                      <Search />
                    </InputAdornment>
                  }
                  onChange={e => setSearch(e.target.value)}
                />
              </FormControl>
            </Grid>
          </Grid>
          <TableContainer sx={{ height: '90%' }}>
            <Table stickyHeader aria-label='customized table'>
              <TableHead>
                <TableRow sx={{ padding: '2%' }}>
                  <StyledTableCell align='left' sx={{ width: '13%' }}>
                    Student Roll No.
                  </StyledTableCell>
                  <StyledTableCell align='left' sx={{ width: '16%' }}>
                    Student Name
                  </StyledTableCell>
                  {selectedSubject?.theory_hours > 0 && (
                    <>
                      <StyledTableCell align='center'>
                        Mid Marks
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        Final Marks
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        Sessional Marks
                      </StyledTableCell>
                    </>
                  )}
                  {selectedSubject?.lab_hours > 0 && (
                    <>
                      <StyledTableCell align='center'>
                        Lab Final Marks
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        Lab Sessional Marks
                      </StyledTableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody sx={{ overflowY: 'auto' }}>{dataList}</TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </>
  )
}
