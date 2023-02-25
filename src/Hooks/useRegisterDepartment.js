import { useEffect, useState } from 'react'

import { registerDepartmentRequest } from '../Services/API/registerDepartment'

import useAuth from './useAuth'

export default function useRegisterDepartment() {
  const { token } = useAuth()

  const submitForm = async (
    values,
    { setErrors, setStatus, setSubmitting },
  ) => {
    setSubmitting(true)
    const d = {
      department_name: values.name,
      department_abbreviation: values.abbreviation,
      no_of_programs: values.noOfPrograms,
      lat: values.lat,
      lng: values.lng,
      description: values.description,
    }
    try {
      const data = registerDepartmentRequest(token, d)
      setSubmitting(false)
      console.log(data)
    } catch (err) {
      setSubmitting(false)
      console.log(err)
    }
  }

  return { submitForm }
}
