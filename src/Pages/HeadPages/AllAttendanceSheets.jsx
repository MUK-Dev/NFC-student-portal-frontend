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
import { motion } from 'framer-motion'
import moment from 'moment'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router'

import AdminAttendanceReportModal from '../../Components/Modal/AdminAttendanceReportModal'
import TeacherAttendanceReportModal from '../../Components/Modal/TeacherAttendanceReportModal'

import useAuth from '../../Hooks/useAuth'

import { getAllAttendanceSheets } from '../../Services/API/getAllAttendanceSheetsRequest'

const tableHeaders = [
  'Teacher',
  'Department',
  'Program',
  'Session',
  'Section',
  'Semester',
  'Subject - Code',
  'Marked on',
]

const AllAttendanceSheets = () => {
  const { token } = useAuth()
  const [search, setSearch] = useState('')
  const [showReportModal, setShowReportModal] = useState(false)
  const navigate = useNavigate()

  const { isError, isLoading, data } = useQuery(
    ['sheets', token],
    () => getAllAttendanceSheets(token),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: !!token,
    },
  )

  const toggleGenerateReportModal = () => setShowReportModal(prev => !prev)
  const dataList =
    !!data &&
    data
      ?.filter(r => {
        if (search === '') return true
        else if (
          r?.teacher?.name.toLowerCase().includes(search.toLowerCase()) ||
          r?.department?.department_name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          r?.program?.program_abbreviation
            .toLowerCase()
            .includes(search?.toLowerCase()) ||
          r?.session?.session_title
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          r?.section?.section_title
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          r?.semester?.semester_title
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          r?.subject?.subject_title
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          r?.subject?.subject_code.toLowerCase().includes(search.toLowerCase())
        )
          return true
      })
      ?.map((r, i) => (
        <TableRow
          hover
          component={motion.tr}
          initial={{ opacity: 0, y: 30, filter: 'blur(20px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.1 * i }}
          key={r._id}
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate(`/head/attendance/view?sheetId=${r._id}`)}
        >
          <TableCell align='center'>{r?.teacher?.name}</TableCell>
          <TableCell align='center'>{r?.department?.department_name}</TableCell>
          <TableCell align='center'>
            {r?.program?.program_abbreviation}
          </TableCell>
          <TableCell align='center'>{r?.session?.session_title}</TableCell>
          <TableCell align='center'>{r?.section?.section_title}</TableCell>
          <TableCell align='center'>{r?.semester?.semester_title}</TableCell>
          <TableCell align='center'>{`${r?.subject?.subject_title} - ${r?.subject?.subject_code}`}</TableCell>
          <TableCell align='center'>{moment(r?.date).format('LLL')}</TableCell>
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
          <Tooltip title='Generate Report' placement='top'>
            <IconButton
              color='primary'
              onClick={toggleGenerateReportModal}
              sx={{ marginRight: '1em' }}
            >
              <Save />
            </IconButton>
          </Tooltip>
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
              {tableHeaders?.map((h, i) => (
                <TableCell id={i} align='center'>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{dataList}</TableBody>
        </Table>
      </TableContainer>
      <AdminAttendanceReportModal
        open={showReportModal}
        onClose={toggleGenerateReportModal}
      />
    </Paper>
  )
}

export default AllAttendanceSheets
