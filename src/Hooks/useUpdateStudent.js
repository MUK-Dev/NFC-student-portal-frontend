import { useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router'

import { updateStudentRequest } from '../Services/API/updateStudent'

import useAuth from './useAuth'
import useSnackbar from './useSnackbar'

export default function useUpdateStudent() {
  const { studentId } = useParams()
  const { onClose, setSnackbar, snackbar } = useSnackbar()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { token } = useAuth()

  const updateForm = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true)

    try {
      const data = await updateStudentRequest(token, studentId, values)
      setSnackbar(prev => ({
        ...prev,
        severity: 'success',
        message: data?.message,
        open: true,
      }))
      queryClient.invalidateQueries(['student', studentId])
      setSubmitting(false)
      navigate('/head/dashboard')
    } catch (err) {
      console.log(err)
      setSubmitting(false)
      setSnackbar(prev => ({
        ...prev,
        severity: 'error',
        message: err?.response?.data?.message,
        open: true,
      }))
    }
  }

  return { studentId, onClose, setSnackbar, snackbar, updateForm }
}
