import moment from 'moment'
import { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'

import { registerSubjectRequest } from '../Services/API/registerSubject'
import { updateSubjectRequest } from '../Services/API/updateSubjectsRequest'

import useAuth from './useAuth'
import useSnackbar from './useSnackbar'

export default function useRegisterSubject() {
  const { token } = useAuth()
  const { onClose, setSnackbar, snackbar } = useSnackbar()
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const queryClient = useQueryClient()

  const submitForm = async (
    values,
    { setErrors, setStatus, setSubmitting, resetForm },
  ) => {
    setSubmitting(true)
    const d = {
      subject_title: values.subject_title,
      type: values.type,
      subject_code: values.subject_code,
      theory_hours: values.theory_hours,
      lab_hours: values.lab_hours,
      department: values.department,
      program: values.program,
      session: values.session,
      semester: values.semester,
    }
    try {
      const data = await registerSubjectRequest(token, d)
      setSnackbar(prev => ({
        ...prev,
        severity: 'success',
        message: data?.message,
        open: true,
      }))
      queryClient.invalidateQueries('all-subjects')
      queryClient.invalidateQueries(['subject', selectedSubject])
      setSubmitting(false)
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
    { setErrors, setStatus, setSubmitting, resetForm },
  ) => {
    setSubmitting(true)
    const d = {
      subject_title: values.subject_title,
      type: values.type,
      subject_code: values.subject_code,
      theory_hours: values.theory_hours,
      lab_hours: values.lab_hours,
      department: values.department,
      program: values.program,
      session: values.session,
      semester: values.semester,
    }
    try {
      const data = await updateSubjectRequest(token, selectedSubject, d)
      setSnackbar(prev => ({
        ...prev,
        severity: 'success',
        message: data?.message,
        open: true,
      }))
      queryClient.invalidateQueries('all-subjects')
      queryClient.invalidateQueries(['subject', selectedSubject])
      setSubmitting(false)
      setSelectedSubject(null)
      setEditMode(false)
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
    onClose,
    setSnackbar,
    snackbar,
    selectedSubject,
    setSelectedSubject,
    editMode,
    setEditMode,
    updateForm,
  }
}
