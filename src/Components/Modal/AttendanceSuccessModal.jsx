import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { useNavigate } from 'react-router'

const AttendanceSuccessModal = ({ text, ...rest }) => {
  const navigate = useNavigate()

  return (
    <Dialog {...rest}>
      <DialogTitle>{text}</DialogTitle>
      <DialogActions>
        <Button onClick={() => navigate('/student/home')}>Continue</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AttendanceSuccessModal
