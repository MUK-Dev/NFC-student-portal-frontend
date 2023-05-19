import { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'

import { registerDepartmentRequest } from '../Services/API/registerDepartment'
import { updateDepartmentRequest } from '../Services/API/updateDepartmentRequest'

import useAuth from './useAuth'
import useSnackbar from './useSnackbar'

export default function useRegisterDepartment() {
  const { token } = useAuth()
  const { snackbar, onClose, setSnackbar } = useSnackbar()
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const queryClient = useQueryClient()

  const submitForm = async (
    values,
    { setErrors, setStatus, setSubmitting, resetForm },
  ) => {
    setSubmitting(true)
    const d = {
      department_name: values.name,
      department_abbreviation: values.abbreviation,
      no_of_programs: values.noOfPrograms,
      lat: values.lat,
      lng: values.lng,
    }
    try {
      const data = await registerDepartmentRequest(token, d)
      setSubmitting(false)
      setSnackbar(prev => ({
        ...prev,
        severity: 'success',
        message: data?.message,
        open: true,
      }))
      queryClient.invalidateQueries('departments')
      queryClient.invalidateQueries(['departments', selectedDepartment])
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
    departmentId,
    values,
    { setErrors, setStatus, setSubmitting, resetForm },
  ) => {
    setSubmitting(true)
    const d = {
      department_name: values.name,
      department_abbreviation: values.abbreviation,
      no_of_programs: values.noOfPrograms,
      location: {
        lat: values.lat,
        lng: values.lng,
      },
    }
    try {
      const data = await updateDepartmentRequest(token, departmentId, d)
      setSubmitting(false)
      setSnackbar(prev => ({
        ...prev,
        severity: 'success',
        message: data?.message,
        open: true,
      }))
      queryClient.invalidateQueries('departments')
      queryClient.invalidateQueries(['departments', selectedDepartment])
      setSelectedDepartment(null)
      setEditMode(false)
      resetForm()
    } catch (err) {
      setSubmitting(false)
      console.log(err)
      setSnackbar(prev => ({
        ...prev,
        severity: 'error',
        message: err.response.data.message,
        open: true,
      }))
    }
  }

  return {
    submitForm,
    updateForm,
    snackbar,
    selectedDepartment,
    setSelectedDepartment,
    editMode,
    setEditMode,
    onClose,
  }
}
