import { Save, Search } from '@mui/icons-material'
import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
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
  Tooltip,
  Typography,
} from '@mui/material'
import moment from 'moment'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router'

import ClassResultDialogBox from '../../Components/DialogBox/ClassResultDialogBox'
import SemesterResultDialogBox from '../../Components/DialogBox/SemesterResultDialogBox'

import useAuth from '../../Hooks/useAuth'

import { getAllResultSheetsRequest } from '../../Services/API/getAllResultSheetsRequest'
import { getResultSheetsDataRequest } from '../../Services/API/getResultSheetsRequest'

const tableHeaders = [
  'Teacher',
  'Department',
  'Program',
  'Session',
  'Section',
  'Semester',
  'Subject - Code',
  'Marked on',
  'Download',
]

const AdminResult = () => {
  const { token } = useAuth()
  const [search, setSearch] = useState('')
  const [semesterResult, setSemesterResult] = useState(false)
  const [dialogBox, setDialogBox] = useState(false)
  const [values, setValues] = useState({
    Session: '',
    Program: '',
    Section: '',
    Subject: '',
    SheetId: '',
  })
  const navigate = useNavigate()

  const { isError, isLoading, data } = useQuery(
    ['all-result-sheets', token],
    () => getAllResultSheetsRequest(token),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: !!token,
    },
  )

  const dataList =
    !isLoading &&
    !isError &&
    !!data &&
    data
      ?.filter(r => {
        if (search === '') return true
        else if (
          r.theory_teacher.name.toLowerCase().includes(search.toLowerCase()) ||
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
          // onClick={() => navigate(`/teacher/result-form?sheetId=${r._id}`)}
        >
          <TableCell
            align='center'
            onClick={() => navigate(`/head/result-sheet?sheetId=${r._id}`)}
          >
            {r.theory_teacher.name}
          </TableCell>
          <TableCell
            align='center'
            onClick={() => navigate(`/head/result-sheet?sheetId=${r._id}`)}
          >
            {r.department.department_name}
          </TableCell>
          <TableCell
            align='center'
            onClick={() => navigate(`/head/result-sheet?sheetId=${r._id}`)}
          >
            {r.program.program_abbreviation}
          </TableCell>
          <TableCell
            align='center'
            onClick={() => navigate(`/head/result-sheet?sheetId=${r._id}`)}
          >
            {r.session.session_title}
          </TableCell>
          <TableCell
            align='center'
            onClick={() => navigate(`/head/result-sheet?sheetId=${r._id}`)}
          >
            {r.section.section_title}
          </TableCell>
          <TableCell
            align='center'
            onClick={() => navigate(`/head/result-sheet?sheetId=${r._id}`)}
          >
            {r.semester.semester_title}
          </TableCell>
          <TableCell
            align='center'
            onClick={() => navigate(`/head/result-sheet?sheetId=${r._id}`)}
          >{`${r.subject.subject_title} ${r.subject.subject_code}`}</TableCell>
          <TableCell
            align='center'
            onClick={() => navigate(`/head/result-sheet?sheetId=${r._id}`)}
          >
            {moment(r.date).format('LLL')}
          </TableCell>
          <TableCell align='center'>
            <Tooltip title='Generate Report' placement='top'>
              <IconButton
                color='primary'
                sx={{ marginRight: '1em' }}
                onClick={e => {
                  setValues({
                    Session: r.session.session_title,
                    Program: r.program.program_abbreviation,
                    Section: r.section.section_title,
                    Subject: r.subject.subject_title,
                    SheetId: r._id,
                  })
                  setDialogBox(true)
                }}
              >
                <Save />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
      ))

  return (
    <>
      <Paper sx={{ padding: '1em', maxHeight: '80vh' }}>
        <Grid container justifyContent='space-between' alignItems='center'>
          <Grid item>
            <Typography
              variant='h6'
              sx={{ textAlign: { xs: 'center', md: 'left' } }}
              gutterBottom
            >
              Result Records
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              color='primary'
              sx={{ marginRight: '1em' }}
              onClick={() => setSemesterResult(true)}
            >
              <Save />
            </IconButton>
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
        {isError && (
          <Typography color='error'>Couldn't find records</Typography>
        )}
        <TableContainer sx={{ maxHeight: '70vh', overflow: 'auto' }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {tableHeaders.map(h => (
                  <TableCell id={h} key={h} align='center'>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{dataList}</TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <ClassResultDialogBox
        open={dialogBox}
        value={values}
        onClose={() => setDialogBox(false)}
      />
      <SemesterResultDialogBox
        open={semesterResult}
        onClose={() => setSemesterResult(false)}
      />
    </>
  )
}

export default AdminResult
