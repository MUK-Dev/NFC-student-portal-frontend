import { ArrowForwardIos } from '@mui/icons-material'
import {
  Box,
  Button,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import React, { useState } from 'react'

/* 
------ MUST READ ------
Keep the files structure similar.
Each group must have similar folder with their
group leader name's first letter and G followed by a - and Folder Name
e.g: IG-HeadForms for Idrees Group
UG = Usman Group
RDepartment = Register Department
*/

const IDepartment = () => {
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
            'Department 1',
            'Department 2',
            'Department 3',
            'Department 4',
            'Department 5',
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
            <Typography variant='h4'>Register Department</Typography>
            <Typography gutterBottom>Enter the department details</Typography>
          </Grid>
          <Grid item width='100%'>
            <Grid container width='100%'>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <TextField
                  variant='outlined'
                  label='Department Name'
                  type='text'
                  placeholder='Akhtar Ali Kalru Block'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <TextField
                  variant='outlined'
                  label='Department Abbreviation'
                  type='text'
                  placeholder='Computer Science / CS'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <TextField
                  variant='outlined'
                  label='Department Location'
                  type='text'
                  placeholder='234'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <TextField
                  variant='outlined'
                  label='Department Start Date'
                  type='text'
                  placeholder='DD/MM/YYYY'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <TextField
                  variant='outlined'
                  label='No. of Programs'
                  type='number'
                  placeholder='3'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <TextField
                  variant='outlined'
                  label='Department Description'
                  type='text'
                  placeholder='This department delivers courses related to Computers'
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid
              container
              width='100%'
              direction='row'
              justifyContent='space-between'
            >
              <Typography sx={{ width: '15%' }}></Typography>
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
                Program ={'>'}
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
            Show Departments
          </Typography>
          <ArrowForwardIos htmlColor={theme.palette.warning.main} />
        </Stack>
      </Grid>
      {drawer}
    </Grid>
  )
}

export default IDepartment
