import moment from 'moment'
import { useState } from 'react'
import { useQueryClient } from 'react-query'

import { registerSemesterRequest } from '../Services/API/registerSemester'
import { updateSemesterRequest } from '../Services/API/updateSemesterRequest'

import useAuth from './useAuth'
import useSnackbar from './useSnackbar'

export default function useRegisterSemester() {
  const { token } = useAuth()
  const { onClose, setSnackbar, snackbar } = useSnackbar()
  const [selectedSemester, setSelectedSemester] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const queryClient = useQueryClient()

  const submitForm = async (
    values,
    start,
    end,
    { setErrors, setStatus, setSubmitting, resetForm },
  ) => {
    setSubmitting(true)
    const d = {
      semester_title: values.semester_title,
      type: values.type,
      starting: start,
      ending: end,
      department: values.department,
      program: values.program,
      session: values.session,
    }
    try {
      const data = await registerSemesterRequest(token, d)
      setSubmitting(false)
      setSnackbar(prev => ({
        ...prev,
        severity: 'success',
        message: data?.message,
        open: true,
      }))
      queryClient.invalidateQueries('all-semesters')
      queryClient.invalidateQueries(['semester', selectedSemester])
      resetForm()
    } catch (err) {
      setSubmitting(false)
      setSnackbar(prev => ({
        ...prev,
        severity: 'error',
        message: err?.response?.data?.message,
        open: true,
      }))
    }
  }

  const updateForm = async (
    values,
    start,
    end,
    { setErrors, setStatus, setSubmitting, resetForm },
  ) => {
    setSubmitting(true)
    const d = {
      semester_title: values.semester_title,
      type: values.type,
      starting: start,
      ending: end,
      department: values.department,
      program: values.program,
      session: values.session,
    }
    try {
      const data = await updateSemesterRequest(token, selectedSemester, d)
      setSubmitting(false)
      setSnackbar(prev => ({
        ...prev,
        severity: 'success',
        message: data?.message,
        open: true,
      }))
      setSelectedSemester(null)
      setEditMode(false)
      queryClient.invalidateQueries('all-semesters')
      queryClient.invalidateQueries(['semester', selectedSemester])
      resetForm()
    } catch (err) {
      setSubmitting(false)
      setSnackbar(prev => ({
        ...prev,
        severity: 'error',
        message: err?.response?.data?.message,
        open: true,
      }))
    }
  }

  return {
    submitForm,
    updateForm,
    onClose,
    setSnackbar,
    snackbar,
    selectedSemester,
    setSelectedSemester,
    editMode,
    setEditMode,
  }
}
