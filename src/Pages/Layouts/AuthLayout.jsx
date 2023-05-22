import { Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'

import AuthLeftIllustration from '../../Components/auth/AuthLeftIllustration'

const AuthLayout = ({ children }) => {
  return (
    <Grid
      container
      width='100%'
      minHeight='100vh'
      maxHeight='100vh'
      sx={{ overflow: 'hidden' }}
    >
      <Grid
        item
        md={7}
        lg={8}
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'relative',
          zIndex: -1000,
          overflow: 'hidden',
        }}
      >
        <AuthLeftIllustration />
      </Grid>
      <Grid
        item
        xs={12}
        md={5}
        lg={4}
        sx={{ zIndex: 1000, backgroundColor: '#fcfcfc', overflowX: 'hidden' }}
      >
        <Outlet />
      </Grid>
    </Grid>
  )
}

export default AuthLayout
