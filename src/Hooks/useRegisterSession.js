import moment from 'moment'
import { useEffect, useState } from 'react'

import { registerSessionRequest } from '../Services/API/registerSession'

import useAuth from './useAuth'

export default function useRegisterSession() {
  const { token } = useAuth()

  const submitForm = async (
    values,
    selectedValue,
    start,
    end,
    { setErrors, setStatus, setSubmitting },
  ) => {
    if (selectedValue.department === '' || selectedValue.program === '') return
    setSubmitting(true)
    const d = {
      session_title: values.session_title,
      type: values.type,
      starting_year: start,
      ending_year: end,
      department: selectedValue.department,
      program: selectedValue.program,
    }
    try {
      const data = await registerSessionRequest(token, d)
      setSubmitting(false)
    } catch (err) {
      setSubmitting(false)
      console.log(err)
    }
  }

  return { submitForm }
}
