import moment from 'moment'
import { useEffect, useState } from 'react'

import { registerSemesterRequest } from '../Services/API/registerSemester'

import useAuth from './useAuth'

export default function useRegisterSemester() {
  const { token } = useAuth()

  const submitForm = async (
    values,
    selectedValue,
    start,
    end,
    { setErrors, setStatus, setSubmitting },
  ) => {
    if (
      selectedValue.department === '' ||
      selectedValue.program === '' ||
      selectedValue.session == ''
    )
      return
    setSubmitting(true)
    const d = {
      semester_title: values.semester_title,
      type: values.type,
      starting: start,
      ending: end,
      department: selectedValue.department,
      program: selectedValue.program,
      session: selectedValue.session,
    }
    try {
      const data = await registerSemesterRequest(token, d)
      setSubmitting(false)
    } catch (err) {
      setSubmitting(false)
      console.log(err)
    }
  }

  return { submitForm }
}
