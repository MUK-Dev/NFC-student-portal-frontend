import React, { useState } from 'react';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';

const ISession = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const theme = useTheme();

  const drawer = (
    <Drawer
      anchor='right'
      open={showDrawer}
      onClose={() => setShowDrawer((prev) => !prev)}
    >
      <Box sx={{ width: 250 }}>
        <List>
          {[
            'Semester 1',
            'Semester 2',
            'Semester 3',
            'Semester 4',
            'Semester 5',
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
  );

  return (
    <Grid container flexWrap='nowrap'>
      <Grid item flexGrow={1}>
        <Grid container direction='column' width='100%'>
          <Grid item width='100%'>
            <Typography variant='h4'>Register Semester</Typography>
            <Typography gutterBottom>Enter the Semester details</Typography>
          </Grid>
          <Grid item width='100%'>
            <Grid container width='100%'>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <FormControl fullWidth>
                  <InputLabel>Semester Title</InputLabel>
                  <Select label='Semester Title'>
                    <MenuItem value={10}>1</MenuItem>
                    <MenuItem value={20}>2</MenuItem>
                    <MenuItem value={30}>3</MenuItem>
                    <MenuItem value={40}>4</MenuItem>
                    <MenuItem value={50}>5</MenuItem>
                    <MenuItem value={60}>6</MenuItem>
                    <MenuItem value={70}>7</MenuItem>
                    <MenuItem value={80}>8</MenuItem>
                    <MenuItem value={90}>9</MenuItem>
                    <MenuItem value={100}>10</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <FormControl fullWidth>
                  <InputLabel>Semester Type</InputLabel>
                  <Select label='Semester Type'>
                    <MenuItem value={10}>Rugular</MenuItem>
                    <MenuItem value={20}>Summer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <TextField
                  variant='outlined'
                  label='Starting Year'
                  type='text'
                  placeholder='DD/MM/YYYY'
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <TextField
                  variant='outlined'
                  label='Ending  Year'
                  type='text'
                  fullWidth
                  placeholder='DD/MM/YYYY'
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
              <Grid item xs={12} md={6} padding='.5em .5em .5em 0'>
                <FormControl fullWidth>
                  <InputLabel>Select Session</InputLabel>
                  <Select label='SSelect Session'>
                    <MenuItem value={10}>2k19 - 2k23</MenuItem>
                    <MenuItem value={20}>2k20 - 2k24</MenuItem>
                    <MenuItem value={20}>2k21 - 2k25</MenuItem>
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
                {'<'}= Session
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
                Subject ={'>'}
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
          onClick={() => setShowDrawer((prev) => !prev)}
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
            Show Semesters
          </Typography>
          <ArrowForwardIos htmlColor={theme.palette.warning.main} />
        </Stack>
      </Grid>
      {drawer}
    </Grid>
  );
};

export default ISession;
