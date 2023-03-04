import moment from 'moment'
import { useEffect, useState } from 'react'

import { registerSectionRequest } from '../Services/API/registerSection'

import useAuth from './useAuth'

export default function useRegisterSection() {
  const { token } = useAuth()

  const submitForm = async (
    values,
    selectedValue,
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
      section_title: values.section_title,
      department: selectedValue.department,
      program: selectedValue.program,
      session: selectedValue.session,
    }
    console.log(d)
    try {
      const data = await registerSectionRequest(token, d)
      setSubmitting(false)
      console.log(data)
    } catch (err) {
      setSubmitting(false)
      console.log(err)
    }
  }

  return { submitForm }
}
