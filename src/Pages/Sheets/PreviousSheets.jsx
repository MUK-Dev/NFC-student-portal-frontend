import { Search } from '@mui/icons-material'
import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  OutlinedInput,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import moment from 'moment'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router'

import useAuth from '../../Hooks/useAuth'

import { getAttendanceSheetsDataRequest } from '../../Services/API/getAttendanceSheetsRequest'

const tableHeaders = [
  'Department',
  'Program',
  'Session',
  'Section',
  'Semester',
  'Subject - Code',
  'Marked on',
]

const PreviousSheets = () => {
  const { token } = useAuth()
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const { isError, isLoading, data } = useQuery(
    ['sheets', token],
    () => getAttendanceSheetsDataRequest(token),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: !!token,
    },
  )

  const dataList =
    !!data &&
    data
      ?.filter(r => {
        if (search === '') return true
        else if (
          r.department.department_name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          r.program.program_abbreviation
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          r.session.session_title
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          r.section.section_title
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          r.semester.semester_title
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          r.subject.subject_title
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          r.subject.subject_code.toLowerCase().includes(search.toLowerCase())
        )
          return true
      })
      ?.map(r => (
        <TableRow
          hover
          key={r._id}
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate(`/teacher/mark-attandence?sheetId=${r._id}`)}
        >
          <TableCell align='center'>{r.department.department_name}</TableCell>
          <TableCell align='center'>{r.program.program_abbreviation}</TableCell>
          <TableCell align='center'>{r.session.session_title}</TableCell>
          <TableCell align='center'>{r.section.section_title}</TableCell>
          <TableCell align='center'>{r.semester.semester_title}</TableCell>
          <TableCell align='center'>{`${r.subject.subject_title} ${r.subject.subject_code}`}</TableCell>
          <TableCell align='center'>{moment(r.date).format('LLL')}</TableCell>
        </TableRow>
      ))

  return (
    <Paper sx={{ padding: '1em' }}>
      <Grid container justifyContent='space-between' alignItems='center'>
        <Grid item>
          <Typography
            variant='h6'
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
            gutterBottom
          >
            Attendance Records
          </Typography>
        </Grid>
        <Grid item>
          <FormControl
            sx={{ width: { xs: '100%', md: '30ch' } }}
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
      {isLoading && (
        <Stack alignItems='center' width='100%'>
          <CircularProgress />
        </Stack>
      )}
      {isError && <Typography color='error'>Couldn't find records</Typography>}
      <TableContainer sx={{ maxHeight: '80vh', overflow: 'auto' }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {tableHeaders.map(h => (
                <TableCell id={h} align='center'>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{dataList}</TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default PreviousSheets
