import { ArrowForwardIos } from '@mui/icons-material'
import {
  Box,
  Button,
  Drawer,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import React, { useState } from 'react'

const ISubject = () => {
  const [showDrawer, setShowDrawer] = useState(false)
  const theme = useTheme()

  const drawer = (
    <Drawer
      anchor='right'
      open={showDrawer}
      onClose={() => setShowDrawer(prev => !prev)}
    >
      <Box sx={{ width: 250 }}>
        <List>
          {[
            'Subject 1',
            'Subject 2',
            'Subject 3',
            'Subject 4',
            'Subject 5',
          ].map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )

  return (
    <Grid container flexWrap='nowrap'>
      <Grid item flexGrow={1}>
        <Grid container direction='column' width='100%'>
          <Grid item width='100%'>
            <Typography variant='h4'>Register Subject</Typography>
            <Typography gutterBottom>Enter the Subject details</Typography>
          </Grid>
          <Grid item width='100%'>
            <Grid container width='100%'>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <TextField
                  variant='outlined'
                  label='Subject Code'
                  type='text'
                  placeholder='CS-111'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <TextField
                  variant='outlined'
                  label='Subject Title'
                  type='text'
                  placeholder='Programming Fundamentals'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <FormControl fullWidth>
                  <InputLabel>Subject Type</InputLabel>
                  <Select label='Subject Type'>
                    <MenuItem value={10}>Core</MenuItem>
                    <MenuItem value={20}>Elective</MenuItem>
                    <MenuItem value={30}>Supply</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <FormControl fullWidth>
                  <InputLabel>Select Program</InputLabel>
                  <Select label='Select Program'>
                    <MenuItem value={10}>BS</MenuItem>
                    <MenuItem value={20}>MS</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <FormControl fullWidth>
                  <InputLabel>Select Department</InputLabel>
                  <Select label='Select Department'>
                    <MenuItem value={10}>Computer Science</MenuItem>
                    <MenuItem value={20}>Mechanical Engineering</MenuItem>
                    <MenuItem value={20}>Electrical Engineering</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <FormControl fullWidth>
                  <InputLabel>Select Session</InputLabel>
                  <Select label='Select Session'>
                    <MenuItem value={10}>2k19 - 2k23</MenuItem>
                    <MenuItem value={20}>2k20 - 2k24</MenuItem>
                    <MenuItem value={20}>2k21 - 2k25</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3} padding='.5em .5em .5em 0'>
                <TextField
                  variant='outlined'
                  label='Theory Credit Hours'
                  type='number'
                  placeholder='3'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3} padding='.5em .5em .5em 0'>
                <TextField
                  variant='outlined'
                  label='Lab Credit Hours'
                  type='number'
                  placeholder='1'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <FormControl fullWidth>
                  <InputLabel>Select Semester</InputLabel>
                  <Select label='Semester Type'>
                    <MenuItem value={10}>1</MenuItem>
                    <MenuItem value={20}>2</MenuItem>
                    <MenuItem value={30}>3</MenuItem>
                    <MenuItem value={40}>4</MenuItem>
                    <MenuItem value={50}>5</MenuItem>
                    <MenuItem value={60}>6</MenuItem>
                    <MenuItem value={70}>7</MenuItem>
                    <MenuItem value={80}>8</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid
              container
              width='100%'
              direction='row'
              justifyContent='space-between'
            >
              <Button
                variant='contained'
                sx={{ margin: '.5em .5em .5em 0', minWidth: '15%' }}
              >
                {'<'}= Semester
              </Button>
              <Button
                variant='contained'
                sx={{ margin: '.5em .5em .5em 0', minWidth: '15%' }}
              >
                Register
              </Button>
              <Typography sx={{ width: '15%' }}></Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='center'
          height='100%'
          onClick={() => setShowDrawer(prev => !prev)}
          sx={{
            cursor: 'pointer',
          }}
        >
          <Typography
            variant='caption'
            sx={{
              writingMode: 'vertical-rl',
            }}
          >
            Show Subjects
          </Typography>
          <ArrowForwardIos htmlColor={theme.palette.warning.main} />
        </Stack>
      </Grid>
      {drawer}
    </Grid>
  )
}

export default ISubject
