import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router'

const EndStudentRegisterModal = ({ email, ...rest }) => {
  const navigate = useNavigate()

  const handleNext = () => {
    navigate('/student/home')
  }

  return (
    <Dialog {...rest}>
      <DialogContent>
        <Typography align='center' gutterBottom>
          This will be your email to login
        </Typography>
        <Typography align='center' variant='h6' fontWeight={600}>
          {email}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleNext} autoFocus>
          Continue to dashboard
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EndStudentRegisterModal
