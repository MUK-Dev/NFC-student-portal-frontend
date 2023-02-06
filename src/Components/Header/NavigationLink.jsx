import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useTheme,
} from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

const NavigationLink = ({ path, title, icon }) => {
  const theme = useTheme()
  return (
    <Tooltip title={title} placement='right'>
      <ListItem disablePadding>
        <NavLink
          to={path}
          style={({ isActive }) => ({
            backgroundColor: isActive
              ? theme.palette.grey[400]
              : 'rgba(0,0,0,0)',
            borderLeft: isActive
              ? '5px solid ' + theme.palette.primary.main
              : '5px solid transparent',
            color: 'black',
            fontSize: '1rem',
            textDecoration: 'none',
            textAlign: 'left',
            width: '100%',
            transition: 'all 0.2s linear',
          })}
        >
          <ListItemButton>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={title} />
          </ListItemButton>
        </NavLink>
      </ListItem>
    </Tooltip>
  )
}

export default NavigationLink
