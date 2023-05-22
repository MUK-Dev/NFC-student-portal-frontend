import moment from 'moment'
import { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'

import { registerSectionRequest } from '../Services/API/registerSection'
import { updateSectionRequest } from '../Services/API/updateSectionRequest'

import useAuth from './useAuth'
import useSnackbar from './useSnackbar'

export default function useRegisterSection() {
  const { token } = useAuth()
  const { onClose, setSnackbar, snackbar } = useSnackbar()
  const [selectedSection, setSelectedSection] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const queryClient = useQueryClient()

  const submitForm = async (
    values,
    { setErrors, setStatus, setSubmitting, resetForm },
  ) => {
    setSubmitting(true)
    const d = {
      section_title: values.section_title,
      department: values.department,
      program: values.program,
      session: values.session,
    }
    try {
      const data = await registerSectionRequest(token, d)
      setSubmitting(false)
      setSnackbar(prev => ({
        ...prev,
        severity: 'success',
        message: data?.message,
        open: true,
      }))
      queryClient.invalidateQueries('all-sections')
      queryClient.invalidateQueries(['section', selectedSection])
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
      section_title: values.section_title,
      department: values.department,
      program: values.program,
      session: values.session,
    }
    try {
      const data = await updateSectionRequest(token, selectedSection, d)
      setSubmitting(false)
      setSnackbar(prev => ({
        ...prev,
        severity: 'success',
        message: data?.message,
        open: true,
      }))
      queryClient.invalidateQueries('all-sections')
      queryClient.invalidateQueries(['section', selectedSection])
      setSelectedSection(null)
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
    selectedSection,
    setSelectedSection,
    editMode,
    setEditMode,
    updateForm,
  }
}
