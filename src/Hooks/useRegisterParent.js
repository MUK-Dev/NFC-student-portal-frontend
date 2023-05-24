import { useNavigate } from 'react-router'

import { getUserRequest } from '../Services/API/getUser'
import { registerParentRequest } from '../Services/API/registerParentRequest'

import useAuth from './useAuth'

export default function useRegisterParent() {
  const navigate = useNavigate()
  const { setToken, setAccessToken, setUser } = useAuth()

  const submitForm = async (values, { setErrors, setSubmitting }) => {
    setSubmitting(true)
    try {
      const { token } = await registerParentRequest(values)
      const user = await getUserRequest(token)
      setToken(token)
      setAccessToken(token)
      setUser(user)
      setSubmitting(false)
      navigate('/parent/home')
    } catch (err) {
      setErrors({ [err.response.data.type]: err.response.data.message })
      setSubmitting(false)
    }
  }

  return { submitForm }
}
