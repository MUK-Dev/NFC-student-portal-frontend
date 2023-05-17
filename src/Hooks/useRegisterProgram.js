import moment from 'moment'
import { useEffect, useState } from 'react'

import { registerProgramRequest } from '../Services/API/registerProgram'
import { updateProgramRequest } from '../Services/API/updateProgramRequest'

import useAuth from './useAuth'
import useSnackbar from './useSnackbar'

export default function useRegisterProgram() {
  const { token } = useAuth()
  const { onClose, setSnackbar, snackbar } = useSnackbar()
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [editMode, setEditMode] = useState(false)

  const submitForm = async (
    starting,
    values,
    { setErrors, setStatus, setSubmitting, resetForm },
  ) => {
    setSubmitting(true)
    const d = {
      program_title: values.program_title,
      program_abbreviation: values.program_abbreviation,
      type: values.type,
      starting: starting.toDate(),
      department: values.department,
      ending: starting.toDate(),
    }

    try {
      const data = await registerProgramRequest(token, d)
      setSubmitting(false)
      setSnackbar(prev => ({
        ...prev,
        severity: 'success',
        message: data?.message,
        open: true,
      }))
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
    starting,
    ending,
    values,
    { setErrors, setStatus, setSubmitting, resetForm },
  ) => {
    setSubmitting(true)
    const d = {
      program_title: values.program_title,
      program_abbreviation: values.program_abbreviation,
      type: values.type,
      starting: starting.toDate(),
      department: values.department,
      ending: ending.toDate(),
    }
    console.log(d)
    try {
      const data = await updateProgramRequest(token, selectedProgram, d)
      setSubmitting(false)
      setSnackbar(prev => ({
        ...prev,
        severity: 'success',
        message: data?.message,
        open: true,
      }))
      setSelectedProgram(null)
      setEditMode(false)
      resetForm()
      console.log(data)
    } catch (err) {
      setSubmitting(false)
      setSnackbar(prev => ({
        ...prev,
        severity: 'error',
        message: err?.response?.data?.message,
        open: true,
      }))
      console.log(err)
    }
  }

  return {
    submitForm,
    onClose,
    setSnackbar,
    snackbar,
    selectedProgram,
    setSelectedProgram,
    editMode,
    setEditMode,
    updateForm,
  }
}
