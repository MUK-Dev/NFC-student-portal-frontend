import { Button, Divider, Stack, Typography, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import { useNavigate, useSearchParams } from 'react-router-dom'

const RegisterOptions = ({ animation }) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const [, setSearchParams] = useSearchParams()

  return (
    <Stack
      key='RegisterOptions'
      component={motion.div}
      variants={animation}
      direction='column'
      alignItems='center'
      initial='initial'
      animate='animate'
      exit='exit'
      width='100%'
    >
      <Typography variant='h5' gutterBottom>
        Register As
      </Typography>
      <Divider
        sx={{
          background: theme.palette.primary.main,
          height: '4px',
          width: '25%',
          borderRadius: '50px',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '1em',
        }}
      />
      <Stack
        direction='column'
        alignItems='center'
        sx={{ paddingInline: '1em', width: '100%', gap: '1em' }}
      >
        <Button
          variant='contained'
          fullWidth
          onClick={() => setSearchParams({ role: 'student' })}
        >
          Student
        </Button>
        <Button
          variant='contained'
          fullWidth
          onClick={() => setSearchParams({ role: 'parent' })}
        >
          Parent
        </Button>
        <Typography
          fontWeight={600}
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Sign In Instead?
        </Typography>
      </Stack>
    </Stack>
  )
}

export default RegisterOptions
