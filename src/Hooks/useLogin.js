import { useState } from 'react'
import { useNavigate } from 'react-router'

import { getUserRequest } from '../Services/API/getUser'
import { loginRequest } from '../Services/API/loginUser'

import useAuth from './useAuth'

export default function useLogin() {
  const navigate = useNavigate()
  const { setToken, setUser, setAccessToken } = useAuth()

  const submitForm = async (values, { setSubmitting, setErrors }) => {
    setSubmitting(true)
    const d = {
      email: values.email,
      password: values.password,
    }
    try {
      const { token } = await loginRequest(d)
      const user = await getUserRequest(token)
      setToken(token)
      setAccessToken(token)
      setUser(user)
      if (user?.role === 'Student') {
        navigate('/student/home')
      } else if (user?.role === 'Parent') {
        navigate('/parent/home')
      } else if (user?.role === 'Admin') {
        navigate('/head/dashboard')
      } else if (user?.role === 'Teacher') {
        navigate('/teacher/home')
      }
      setSubmitting(false)
    } catch (err) {
      setErrors({ [err.response.data.type]: err.response.data.message })
      setSubmitting(false)
    }
  }

  return { submitForm }
}
