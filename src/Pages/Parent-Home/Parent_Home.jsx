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

const currencies = [
  {
    value: 'By Name',
    label: 'Name',
  },
  {
    value: 'By Roll Number',
    label: 'Roll no',
  },
]

export default function Parent_Home() {
  return (
    <Grid container>
      <Grid item flexGrow={1}>
        <Stack>
          {/* <Searchbar/> */}
          <Stack direction='row'>
            <Select
              style={{ borderRadius: '0px 0px 0px 0px' }}
              id='outlined-select-currency'
              defaultValue='By Name'
              helperText='Name or Roll no.'
            >
              {currencies.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <TextField
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
            <IconButton type='button' sx={{ p: '10px' }} aria-label='search'>
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
        </Stack>
      </Grid>
      <Grid item md={3} xs={12}>
        <Paper>
          <center>
            {' '}
            <Typography>History</Typography>
          </center>
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
