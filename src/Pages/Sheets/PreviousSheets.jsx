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
  TextField,
  Typography,
} from '@mui/material'
import moment from 'moment'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router'

import useAuth from '../../Hooks/useAuth'

import { getAttendanceSheetsDataRequest } from '../../Services/API/getAttendanceSheetsRequest'

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
        <Grid key={r._id} item xs={12} sm={6} md={4} lg={3} padding='1em'>
          <Card>
            <CardActionArea
              onClick={() =>
                navigate(`/teacher/mark-attandence?sheetId=${r._id}`)
              }
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color='text.secondary'
                  gutterBottom
                >
                  Marked on {moment(r.date).format('LLL')}
                </Typography>
                <Chip
                  label={r.department.department_name}
                  sx={{ margin: '0.5em' }}
                />
                <Chip
                  label={r.program.program_abbreviation}
                  sx={{ margin: '0.5em' }}
                />
                <Chip
                  label={r.session.session_title}
                  sx={{ margin: '0.5em' }}
                />
                <Chip
                  label={r.section.section_title}
                  sx={{ margin: '0.5em' }}
                />
                <Chip
                  label={`Semester: ${r.semester.semester_title}`}
                  sx={{ margin: '0.5em' }}
                />
                <Chip
                  label={`${r.subject.subject_title} ${r.subject.subject_code}`}
                  sx={{ margin: '0.5em' }}
                />
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))

  return (
    <Paper sx={{ padding: '1em' }}>
      <Grid container justifyContent='space-between' alignItems='center'>
        <Grid item>
          <Typography variant='h6' gutterBottom>
            Attendance Records
          </Typography>
        </Grid>
        <Grid item>
          <FormControl sx={{ width: '30ch' }} size='small' variant='outlined'>
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
      <Grid container width='100%'>
        {dataList}
      </Grid>
    </Paper>
  )
}

export default PreviousSheets
