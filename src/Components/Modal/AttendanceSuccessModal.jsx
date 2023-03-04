import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { useNavigate } from 'react-router'

const AttendanceSuccessModal = ({ ...rest }) => {
  const navigate = useNavigate()

  return (
    <Dialog {...rest}>
      <DialogTitle>Successfully Marked attendance</DialogTitle>
      <DialogActions>
        <Button onClick={() => navigate('/teacher/home')}>Continue</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AttendanceSuccessModal
