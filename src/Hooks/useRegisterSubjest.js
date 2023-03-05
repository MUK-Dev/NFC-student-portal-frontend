import moment from 'moment'
import { useEffect, useState } from 'react'

import { registerSubjectRequest } from '../Services/API/registerSubject'

import useAuth from './useAuth'

export default function useRegisterSubject() {
  const { token } = useAuth()

  const submitForm = async (
    values,
    selectedValue,
    { setErrors, setStatus, setSubmitting },
  ) => {
    if (
      selectedValue.department === '' ||
      selectedValue.program === '' ||
      selectedValue.session == '' ||
      selectedValue.semester == ''
    )
      return
    setSubmitting(true)
    const d = {
      subject_title: values.subject_title,
      type: values.type,
      subject_code: values.subject_code,
      theory_hours: values.theory_hours,
      lab_hours: values.lab_hours,
      department: selectedValue.department,
      program: selectedValue.program,
      session: selectedValue.session,
      semester: selectedValue.semester,
    }
    console.log(d)
    try {
      const data = await registerSubjectRequest(token, d)
      setSubmitting(false)
      console.log(data)
    } catch (err) {
      setSubmitting(false)
      console.log(err)
    }
  }

  return { submitForm }
}
