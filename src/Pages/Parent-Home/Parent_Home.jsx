import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  CircularProgress,
  Grid,
  LinearProgress,
  ListItemButton,
  Select,
  Stack,
} from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router'

import useAuth from '../../Hooks/useAuth'

import { searchStudentRequest } from '../../Services/API/searchStudentsRequest'

const options = [
  {
    value: 'name',
    label: 'Name',
  },
  {
    value: 'rollNo',
    label: 'Roll no',
  },
]

export default function Parent_Home() {
  const fieldRef = useRef('')
  const [query, setQuery] = useState('')
  const [type, setType] = useState('name')
  const [studentHistory, setStudentHistory] = useState([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)
  const { token } = useAuth()
  const navigate = useNavigate()

  const handleSearch = e => {
    e.preventDefault()
    setQuery(fieldRef.current.value)
  }

  let displayType
  if (type === 'rollNo') displayType = 'roll no'
  else if (type === 'name') displayType = 'name'

  const { isError, isLoading, data } = useQuery(
    ['students', query, type],
    () => searchStudentRequest(token, { type, query }),
    {
      staleTime: 1000 * 60 * 60 * 24,
      enabled: !!token && query !== '',
    },
  )

  const handleClick = (studentId, name, rollNo, avatar) => {
    const history = localStorage.getItem('search_history')
    let newHistory = []
    if (history) newHistory = [...JSON.parse(history)]

    if (newHistory.filter(student => student._id === studentId).length <= 0) {
      newHistory.unshift({ _id: studentId, name, rollNo, avatar })
      localStorage.setItem('search_history', JSON.stringify(newHistory))
    }
    navigate(`/parent/home/${studentId}`)
  }

  useEffect(() => {
    setIsLoadingHistory(prev => true)
    const history = localStorage.getItem('search_history')
    if (!history) {
      setIsLoadingHistory(prev => false)
      return
    }
    let parsedHistory = JSON.parse(history)
    if (parsedHistory.length > 5) {
      parsedHistory = parsedHistory.slice(0, 5)
      localStorage.setItem(
        'search_history',
        JSON.stringify(parsedHistory.slice(0, 5)),
      )
    }
    setStudentHistory(parsedHistory)
    setIsLoadingHistory(prev => false)
  }, [])

  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <Stack width='100%'>
          <Box component='form' onSubmit={handleSearch} sx={{ width: '100%' }}>
            <Stack direction='row'>
              <Select
                id='outlined-select-currency'
                value={type}
                onChange={e => setType(e.target.value)}
              >
                {options.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                fullWidth
                placeholder='Name or Roll no'
                inputRef={fieldRef}
              />
              <IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
                <SearchIcon />
              </IconButton>
            </Stack>
          </Box>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {isLoading && (
              <Stack width='100%' alignItems='center' margin='2em 0'>
                <CircularProgress />
              </Stack>
            )}
            {data?.length > 0 && !isLoading ? (
              !isLoading &&
              !isError &&
              data?.map((student, i) => (
                <motion.div
                  key={student._id}
                  initial={{ filter: 'blur(20px)' }}
                  animate={{ filter: 'blur(0px)' }}
                  transition={{ delay: 0.1 * i }}
                >
                  <ListItem alignItems='flex-start'>
                    <ListItemButton
                      onClick={() =>
                        handleClick(
                          student?._id,
                          student?.name,
                          student?.rollNo,
                          student?.avatar,
                        )
                      }
                    >
                      <ListItemAvatar>
                        <Avatar alt={student?.name} src={student?.avatar} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={student?.name}
                        secondary={
                          <>
                            <Typography
                              sx={{ display: 'inline' }}
                              component='span'
                              variant='body2'
                              color='text.primary'
                            >
                              {student?.rollNo}
                            </Typography>
                          </>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                </motion.div>
              ))
            ) : query === '' ? (
              <Typography color='error' align='center'>
                Enter the {displayType} of student
              </Typography>
            ) : (
              <Typography color='error' align='center'>
                Could not find student by that {displayType}
              </Typography>
            )}
          </List>
        </Stack>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ position: 'relative' }}>
          {isLoadingHistory && (
            <LinearProgress
              sx={{
                position: 'absolute',
                width: '100%',
                top: 0,
                left: 0,
              }}
            />
          )}
          <Typography
            align='center'
            sx={{
              paddingTop: '1em',
            }}
          >
            History
          </Typography>
          {!isLoadingHistory && (
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {studentHistory.length > 0 ? (
                studentHistory?.map((student, i) => (
                  <motion.div
                    key={student._id}
                    initial={{ filter: 'blur(20px)' }}
                    animate={{ filter: 'blur(0px)' }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <ListItem alignItems='flex-start'>
                      <ListItemButton
                        onClick={() =>
                          handleClick(
                            student?._id,
                            student?.name,
                            student?.rollNo,
                            student?.avatar,
                          )
                        }
                      >
                        <ListItemAvatar>
                          <Avatar alt={student?.name} src={student?.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={student?.name}
                          secondary={
                            <>
                              <Typography
                                sx={{ display: 'inline' }}
                                component='span'
                                variant='body2'
                                color='text.primary'
                              >
                                {student?.rollNo}
                              </Typography>
                            </>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                    <Divider variant='inset' component='li' />
                  </motion.div>
                ))
              ) : (
                <Typography color='error' align='center'>
                  No history present
                </Typography>
              )}
            </List>
          )}
        </Paper>
      </Grid>
    </Grid>
  )
}
