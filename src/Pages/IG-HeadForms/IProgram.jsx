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

const IProgram = () => {
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
            'Program 1',
            'Program 2',
            'Program 3',
            'Program 4',
            'Program 5',
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
            <Typography variant='h4'>Register Program</Typography>
            <Typography gutterBottom>Enter the Program details</Typography>
          </Grid>
          <Grid item width='100%'>
            <Grid container width='100%'>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <FormControl fullWidth>
                  <InputLabel>Program Title</InputLabel>
                  <Select label='Program Title'>
                    <MenuItem value={10}>Bachelors</MenuItem>
                    <MenuItem value={20}>Master</MenuItem>
                    <MenuItem value={30}>Diploma</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <FormControl fullWidth>
                  <InputLabel>Program Type</InputLabel>
                  <Select label='Program Type'>
                    <MenuItem value={10}>3 Months</MenuItem>
                    <MenuItem value={20}>6 Months</MenuItem>
                    <MenuItem value={30}>1 Year</MenuItem>
                    <MenuItem value={40}>2 Years</MenuItem>
                    <MenuItem value={50}>3 Years</MenuItem>
                    <MenuItem value={60}>4 Years</MenuItem>
                    <MenuItem value={70}>5 Years</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <TextField
                  variant='outlined'
                  label='Starting Date'
                  type='text'
                  placeholder='DD/MM/YYYY'
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <TextField
                  variant='outlined'
                  label='Ending  Date'
                  type='text'
                  fullWidth
                  placeholder='DD/MM/YYYY'
                />
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
                {'<'}= Department
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
                Session ={'>'}
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
            Show Programs
          </Typography>
          <ArrowForwardIos htmlColor={theme.palette.warning.main} />
        </Stack>
      </Grid>
      {drawer}
    </Grid>
  )
}

export default IProgram
