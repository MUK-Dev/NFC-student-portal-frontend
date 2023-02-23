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
  Slider,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import React, { useState } from 'react'

const RSubject = () => {
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
            'Student Name',
            'Student Name',
            'Student Name',
            'Student Name',
            'Student Name',
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
                  <InputLabel>Department</InputLabel>
                  <Select label='Department'>
                    <MenuItem value={10}>Computer Science</MenuItem>
                    <MenuItem value={20}>Mechanical Engineering</MenuItem>
                    <MenuItem value={20}>Electrical Engineering</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <FormControl fullWidth>
                  <InputLabel>Program</InputLabel>
                  <Select label='Program'>
                    <MenuItem value={10}>BS</MenuItem>
                    <MenuItem value={20}>MS</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <FormControl fullWidth>
                  <InputLabel>Session</InputLabel>
                  <Select label='Session'>
                    <MenuItem value={10}>2k19</MenuItem>
                    <MenuItem value={20}>2k20</MenuItem>
                    <MenuItem value={20}>2k21</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <Typography gutterBottom>Theory Credit Hours</Typography>
                <Slider
                  aria-label='Theory Credit Hours'
                  valueLabelDisplay='auto'
                  marks
                  min={1}
                  max={5}
                />
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <FormControl fullWidth>
                  <InputLabel>Semester Type</InputLabel>
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
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <Typography gutterBottom>Lab Credit Hours</Typography>
                <Slider
                  aria-label='Theory Credit Hours'
                  valueLabelDisplay='auto'
                  marks
                  min={1}
                  max={5}
                />
              </Grid>
            </Grid>

            <Button variant='contained' sx={{ margin: '.5em .5em .5em 0' }}>
              Register
            </Button>
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
            Students Enrolled
          </Typography>
          <ArrowForwardIos htmlColor={theme.palette.warning.main} />
        </Stack>
      </Grid>
      {drawer}
    </Grid>
  )
}

export default RSubject
