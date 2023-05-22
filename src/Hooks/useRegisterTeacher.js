import moment from 'moment'
import { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'

import { registerTeacherRequest } from '../Services/API/registerTeacher'
import { updateTeacherRequest } from '../Services/API/updateTeacher'

import useAuth from './useAuth'
import useSnackbar from './useSnackbar'

export default function useRegisterTeacher() {
  const { token } = useAuth()
  const { onClose, setSnackbar, snackbar } = useSnackbar()
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [subjects, setSubjects] = useState([
    {
      subject: '',
      theory_hours: '',
      lab_hours: '',
    },
  ])
  const queryClient = useQueryClient()

  const submitForm = async (
    values,
    subjects,
    { setErrors, setStatus, setSubmitting, resetForm },
  ) => {
    setSubmitting(true)
    const d = {
      name: values.name,
      email: values.email,
      phoneNo: values.phoneNo,
      password: values.password,
      subjects: subjects,
    }
    try {
      const data = await registerTeacherRequest(token, d)
      setSnackbar(prev => ({
        ...prev,
        severity: 'success',
        message: data?.message,
        open: true,
      }))
      queryClient.invalidateQueries('all-teachers')
      queryClient.invalidateQueries(['teacher', selectedTeacher])
      setSubmitting(false)
      setSubjects([
        {
          subject: '',
          theory_hours: '',
          lab_hours: '',
        },
      ])
      resetForm()
    } catch (err) {
      setSubmitting(false)
      setSnackbar(prev => ({
        ...prev,
        severity: 'error',
        message: err?.response?.data?.message ?? 'Something went wrong',
        open: true,
      }))
    }
  }

  const updateForm = async (
    values,
    subjects,
    { setErrors, setStatus, setSubmitting, resetForm },
  ) => {
    setSubmitting(true)
    const d = {
      name: values.name,
      email: values.email,
      phoneNo: values.phoneNo,
      subjects: subjects,
      password: values.password,
    }
    try {
      const data = await updateTeacherRequest(token, selectedTeacher, d)
      setSnackbar(prev => ({
        ...prev,
        severity: 'success',
        message: data?.message,
        open: true,
      }))
      queryClient.invalidateQueries('all-teachers')
      queryClient.invalidateQueries(['teacher', selectedTeacher])
      setSubmitting(false)
      setSelectedTeacher(null)
      setEditMode(false)
      setSubjects([
        {
          subject: '',
          theory_hours: '',
          lab_hours: '',
        },
      ])
      resetForm()
    } catch (err) {
      setSubmitting(false)
      setSnackbar(prev => ({
        ...prev,
        severity: 'error',
        message: err?.response?.data?.message ?? 'Something went wrong',
        open: true,
      }))
    }
  }

  return {
    submitForm,
    onClose,
    setSnackbar,
    snackbar,
    selectedTeacher,
    setSelectedTeacher,
    editMode,
    setEditMode,
    updateForm,
    subjects,
    setSubjects,
  }
}
