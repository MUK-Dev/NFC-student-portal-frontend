import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import { Avatar, Drawer, Stack, useMediaQuery } from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import Divider from '@mui/material/Divider'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import useAuth from '../../Hooks/useAuth'

import { getLinks } from '../../Services/NavigationLinks'

import NFCLogo from '../../Assets/Images/NFC Iet Logo.png'

import NavigationLink from './NavigationLink'

const drawerWidth = 270

export default function MiniDrawer() {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const links = getLinks(theme, user?.role)

  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const closedMixin = theme => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  })

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderTop: 'none',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }))

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: prop => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer - 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }))

  const DesktopDrawer = styled(MuiDrawer, {
    shouldForwardProp: prop => prop !== 'open',
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    zIndex: theme.zIndex.drawer - 2,
    boxSizing: 'border-box',
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }))

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const desktopDrawer = (
    <DesktopDrawer
      variant='permanent'
      open={open}
      onMouseEnter={handleDrawerOpen}
    >
      <DrawerHeader>
        <IconButton sx={{ visibility: 'hidden' }} onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Avatar
        src={user?.avatar}
        alt={user?.name}
        sx={{ margin: '0 auto 1em auto' }}
      />
      <List disablePadding>
        {links.map((text, index) => (
          <NavigationLink
            key={index}
            path={text.path}
            title={text.title}
            icon={text.icon}
          />
        ))}
        <Divider />
        {['Log Out'].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                backgroundColor: 'rgba(0,0,0,0)',
                color: 'black',
                fontSize: '1rem',
                textDecoration: 'none',
                padding: '0.6em 1.1em',
                borderLeft: '5px solid transparent',
                textAlign: 'left',
                width: '100%',
              }}
            >
              <ListItemIcon>
                <LogoutIcon
                  htmlColor={theme.palette.getContrastText(
                    theme.palette.grey[400],
                  )}
                />
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </DesktopDrawer>
  )

  const mobileDrawer = (
    <Drawer open={open} onClose={handleDrawerClose}>
      <Stack alignItems='center' gap='1em'>
        <Avatar src={user?.avatar} alt={user?.name} />
        <Typography>{user?.name}</Typography>
      </Stack>
      <List
        disablePadding
        onMouseLeave={handleDrawerClose}
        sx={{
          // marginTop: { xs: '56px', sm: '64px' },
          width: drawerWidth,
        }}
      >
        {links.map((text, index) => (
          <NavigationLink
            key={index}
            path={text.path}
            title={text.title}
            icon={text.icon}
          />
        ))}
        <Divider />
        {['Log Out'].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                backgroundColor: 'rgba(0,0,0,0)',
                color: 'black',
                fontSize: '1rem',
                textDecoration: 'none',
                padding: '0.6em 1.1em',
                borderLeft: '5px solid transparent',
                textAlign: 'left',
                width: '100%',
              }}
            >
              <ListItemIcon>
                <LogoutIcon
                  htmlColor={theme.palette.getContrastText(
                    theme.palette.grey[400],
                  )}
                />
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )

  return (
    <>
      <AppBar
        color='inherit'
        position='fixed'
        open={open}
        elevation={isMobile ? 1 : 0}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={() => setOpen(prev => !prev)}
            edge='start'
            sx={{
              marginRight: { xs: 0, md: 5 },
              // ...(open && !isMobile && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <img
            src={NFCLogo}
            style={{
              width: 50,
              height: 40,
              marginRight: '1em',
            }}
            alt='Logo'
          />
          <Typography variant='h6' width='300px'>
            NFC IET Student Portal
          </Typography>
        </Toolbar>
      </AppBar>
      {mobileDrawer}
      {!isMobile && desktopDrawer}
    </>
  )
}
