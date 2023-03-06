import moment from 'moment'
import { useEffect, useState } from 'react'

import { registerTeacherRequest } from '../Services/API/registerTeacher'

import useAuth from './useAuth'

export default function useRegisterTeacher() {
  const { token } = useAuth()

  const submitForm = async (
    values,
    subjects,
    { setErrors, setStatus, setSubmitting },
  ) => {
    setSubmitting(true)
    const d = {
      name: values.name,
      email: values.email,
      phoneNo: values.phoneNo,
      password: values.password,
      subjects: subjects,
    }
    console.log(d)
    try {
      const data = await registerTeacherRequest(token, d)
      setSubmitting(false)
      console.log(data)
    } catch (err) {
      setSubmitting(false)
      console.log(err)
    }
  }

  return { submitForm }
}
