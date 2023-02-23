import { Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'

import AuthLeftImage from '../../Assets/Images/auth-left-image.jpg'

const AuthLayout = ({ children }) => {
  return (
    <Grid
      container
      width='100%'
      minHeight='100vh'
      maxHeight='100vh'
      sx={{ overflow: 'hidden' }}
    >
      <Grid item md={7} lg={8} sx={{ display: { xs: 'none', md: 'block' } }}>
        <img
          src={AuthLeftImage}
          alt='Auth Left'
          width='100%'
          height='100%'
          style={{ objectFit: 'cover' }}
        />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Outlet />
      </Grid>
    </Grid>
  )
}

export default AuthLayout
