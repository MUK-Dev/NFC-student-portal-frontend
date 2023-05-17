import moment from 'moment'
import { useEffect, useState } from 'react'

import { registerProgramRequest } from '../Services/API/registerProgram'

import useAuth from './useAuth'

export default function useRegisterProgram() {
  const { token } = useAuth()

  const submitForm = async (
    starting,
    values,
    { setErrors, setStatus, setSubmitting },
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
    } catch (err) {
      setSubmitting(false)
      console.log(err)
    }
  }

  return { submitForm }
}
