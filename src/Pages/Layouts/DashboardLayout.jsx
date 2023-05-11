import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Outlet } from 'react-router-dom'

import Header from '../../Components/Header/Header'

import AuthGuard from '../../Utils/AuthGuard'

const DashboardLayout = () => {
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }))

  return (
    <AuthGuard>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          maxWidth: '100vw',
          minHeight: '100vh',
          overflowX: 'hidden',
        }}
      >
        <Header />
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
    </AuthGuard>
  )
}

export default DashboardLayout
