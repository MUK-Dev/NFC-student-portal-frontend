import SearchIcon from '@mui/icons-material/Search'
import { Grid, Select, Stack } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { useState } from 'react'

import useAuth from '../../Hooks/useAuth'

import { searchRequest } from '../../../searchstudent'

const currencies = [
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
  const [type, setType] = useState('name')
  const [query, setQuery] = useState('')

  const { token } = useAuth()
  const handlesubmit = async () => {
    const d = { type, query }
    const res = await searchRequest(token, d)
    console.log(res)
  }

  return (
    <Grid container>
      <Grid item flexGrow={1}>
        <Stack>
          {/* <Searchbar/> */}
          <Stack direction='row'>
            <Select
              onChange={event => setType(event.target.value)}
              value={type}
              style={{ borderRadius: '0px 0px 0px 0px' }}
              id='outlined-select-currency'
              defaultValue='name'
            >
              {currencies.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <TextField
              onChange={event => setQuery(event.target.query)}
              value={query}
              fullWidth
              placeholder='Name or Roll no'
              sx={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
              inputProps={{
                'aria-label': 'search here',
                style: {},
              }}
            />
            <IconButton
              type='button'
              sx={{ p: '10px' }}
              aria-label='search'
              onClick={handlesubmit}
            >
              <SearchIcon />
            </IconButton>
          </Stack>
          {/* <StudentsList /> */}
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          >
            <ListItem alignItems='flex-start'>
              <ListItemAvatar>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
              </ListItemAvatar>
              <ListItemText
                primary='Name'
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component='span'
                      variant='body2'
                      color='text.primary'
                    >
                      Roll No.
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant='inset' component='li' />
            <ListItem alignItems='flex-start'>
              <ListItemAvatar>
                <Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />
              </ListItemAvatar>
              <ListItemText
                primary='Name'
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component='span'
                      variant='body2'
                      color='text.primary'
                    >
                      Roll No.
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant='inset' component='li' />
            <ListItem alignItems='flex-start'>
              <ListItemAvatar>
                <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
              </ListItemAvatar>
              <ListItemText primary='Name' secondary='Roll No.' />
            </ListItem>
          </List>
        </Stack>
      </Grid>
      <Grid item md={3} xs={12}>
        <Paper>
          {/* No html tags */}
          <Typography align='center'>History</Typography>
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          >
            <ListItem alignItems='flex-start'>
              <ListItemAvatar>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
              </ListItemAvatar>
              <ListItemText
                primary='Name'
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component='span'
                      variant='body2'
                      color='text.primary'
                    >
                      Roll No.
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant='inset' component='li' />
            <ListItem alignItems='flex-start'>
              <ListItemAvatar>
                <Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />
              </ListItemAvatar>
              <ListItemText
                primary='Name'
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component='span'
                      variant='body2'
                      color='text.primary'
                    >
                      Roll No.
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant='inset' component='li' />
            <ListItem alignItems='flex-start'>
              <ListItemAvatar>
                <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
              </ListItemAvatar>
              <ListItemText
                primary='Name'
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component='span'
                      variant='body2'
                      color='text.primary'
                    >
                      Roll No.
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </Paper>
      </Grid>
    </Grid>
  )
}
