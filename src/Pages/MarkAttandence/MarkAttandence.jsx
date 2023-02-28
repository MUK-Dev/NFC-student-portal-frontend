import { ArrowForwardIos } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { MobileDatePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import React, { useState } from 'react'

const MarkAttandence = () => {
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
            <Typography variant='h4'>Mark Student Attendance</Typography>
            <Typography gutterBottom>Enter the Class details</Typography>
          </Grid>
          <Grid item width='100%'>
            <Grid container width='100%' gap='2em'>
              <Grid item flexGrow={1} padding='.5em .5em .5em 0'>
                <Stack gap='1em'>
                  <FormControl fullWidth>
                    <InputLabel>Department</InputLabel>
                    <Select label='Department'>
                      <MenuItem value={10}>Computer Science</MenuItem>
                      <MenuItem value={20}>Mechanical Engineering</MenuItem>
                      <MenuItem value={20}>Electrical Engineering</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Program</InputLabel>
                    <Select label='Program'>
                      <MenuItem value={10}>BSCS</MenuItem>
                      <MenuItem value={20}>BSSE</MenuItem>
                      <MenuItem value={20}>BBA</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Session</InputLabel>
                    <Select label='Session'>
                      <MenuItem value={10}>2k19</MenuItem>
                      <MenuItem value={20}>2k20</MenuItem>
                      <MenuItem value={20}>2k21</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Semester</InputLabel>
                    <Select label='Semester'>
                      <MenuItem value={10}>1</MenuItem>
                      <MenuItem value={20}>2</MenuItem>
                      <MenuItem value={20}>3</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Subject</InputLabel>
                    <Select label='Subject'>
                      <MenuItem value={10}>Data Warehouse</MenuItem>
                      <MenuItem value={20}>Wireless Networking</MenuItem>
                      <MenuItem value={20}>FYP</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Grid>
              <Grid item flexGrow={1} padding='.5em .5em .5em 0'>
                <Typography variant='h6' align='center'>
                  Class Students List
                </Typography>
                <ListItem
                  //key={value}
                  secondaryAction={
                    <Checkbox
                      edge='end'
                      // onChange={handleToggle(value)}
                      //checked={checked.indexOf(value) !== -1}
                      // inputProps={{ 'aria-labelledby': labelId }}
                    />
                  }
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar
                      // alt={`Avatar n°${value + 1}`}
                      //src={`/static/images/avatar/${value + 1}.jpg`}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      //id={labelId}
                      primary={`Line item ${+1}`}
                    />
                  </ListItemButton>
                </ListItem>
              </Grid>
            </Grid>
            <Button variant='contained' sx={{ margin: '.5em .5em .5em 0' }}>
              Done
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {drawer}
    </Grid>
  )
}

export default MarkAttandence
