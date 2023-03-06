import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router'

const QRAttendanceErrorModel = ({ text, onClose, ...rest }) => {
  const navigate = useNavigate()

  return (
    <Dialog {...rest} onClose={onClose}>
      <DialogTitle>{text}</DialogTitle>
      <DialogContent>
        <Typography>
          Contact admin and mark attendance on a page for now
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Stay here?</Button>
        <Button onClick={() => navigate('/student/home')}>
          Go to home page?
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default QRAttendanceErrorModel
