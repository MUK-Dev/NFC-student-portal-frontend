import moment from 'moment'
import { useEffect, useState } from 'react'

import { registerSemestemRequest } from '../Services/API/registerSemester'

import useAuth from './useAuth'

export default function useRegisterSemestem() {
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
      semestem_title: values.semestem_title,
      type: values.type,
      starting: start,
      ending: end,
      department: selectedValue.department,
      program: selectedValue.program,
      session: selectedValue.session,
    }
    console.log(d)
    try {
      const data = await registerSemestemRequest(token, d)
      setSubmitting(false)
      console.log(data)
    } catch (err) {
      setSubmitting(false)
      console.log(err)
    }
  }

  return { submitForm }
}
