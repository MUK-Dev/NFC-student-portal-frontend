import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material'

import useGeneratePDFReport from '../../Hooks/useGeneratePDFReport'

const TeacherAttendanceReportModal = ({ ...rest }) => {
  const { generatePDF } = useGeneratePDFReport()

  return (
    <Dialog {...rest}>
      <DialogContent>
        <Typography align='center' gutterBottom>
          This will be your email to login
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={generatePDF} autoFocus>
          Download
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TeacherAttendanceReportModal
