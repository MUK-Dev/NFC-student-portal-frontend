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

const ISession = () => {
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
            'Session 1',
            'Session 2',
            'Session 3',
            'Session 4',
            'Session 5',
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
            <Typography variant='h4'>Register Session</Typography>
            <Typography gutterBottom>Enter the Session details</Typography>
          </Grid>
          <Grid item width='100%'>
            <Grid container width='100%'>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <TextField
                  variant='outlined'
                  label='Session Title'
                  type='text'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <FormControl fullWidth>
                  <InputLabel>Session Type</InputLabel>
                  <Select label='Session Type'>
                    <MenuItem value={10}>Spring</MenuItem>
                    <MenuItem value={20}>Fall</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <TextField
                  variant='outlined'
                  label='Starting Year'
                  type='text'
                  placeholder='YYYY'
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <TextField
                  variant='outlined'
                  label='Ending  Year'
                  type='text'
                  fullWidth
                  placeholder='YYYY'
                />
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
                {'<'}= Program
              </Button>
              <Button
                variant='contained'
                sx={{ margin: '.5em .5em .5em 0', minWidth: '15%' }}
              >
                Register
              </Button>
              <Button
                variant='contained'
                sx={{ margin: '.5em .5em .5em 0', minWidth: '15%' }}
              >
                Semester ={'>'}
              </Button>
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
            Show Sessions
          </Typography>
          <ArrowForwardIos htmlColor={theme.palette.warning.main} />
        </Stack>
      </Grid>
      {drawer}
    </Grid>
  )
}

export default ISession
