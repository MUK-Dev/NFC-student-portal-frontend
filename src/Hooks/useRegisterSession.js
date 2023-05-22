import moment from 'moment'
import { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'

import { registerSessionRequest } from '../Services/API/registerSession'
import { updateSessionRequest } from '../Services/API/updateSessionRequest'

import useAuth from './useAuth'
import useSnackbar from './useSnackbar'

export default function useRegisterSession() {
  const { token } = useAuth()
  const { onClose, setSnackbar, snackbar } = useSnackbar()
  const [selectedSession, setSelectedSession] = useState(null)
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
      session_title: values.session_title,
      type: values.type,
      starting_year: start,
      ending_year: end,
      department: values.department,
      program: values.program,
    }
    try {
      const data = await registerSessionRequest(token, d)
      setSubmitting(false)
      setSnackbar(prev => ({
        ...prev,
        severity: 'success',
        message: data?.message,
        open: true,
      }))
      queryClient.invalidateQueries('all-sessions')
      queryClient.invalidateQueries(['session', selectedSession])
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
      session_title: values.session_title,
      type: values.type,
      starting_year: start,
      ending_year: end,
      department: values.department,
      program: values.program,
    }
    try {
      const data = await updateSessionRequest(token, selectedSession, d)
      setSubmitting(false)
      setSnackbar(prev => ({
        ...prev,
        severity: 'success',
        message: data?.message,
        open: true,
      }))
      setSelectedSession(null)
      setEditMode(false)
      queryClient.invalidateQueries('all-sessions')
      queryClient.invalidateQueries(['session', selectedSession])
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
    selectedSession,
    setSelectedSession,
    onClose,
    setSnackbar,
    snackbar,
    editMode,
    setEditMode,
    updateForm,
  }
}
