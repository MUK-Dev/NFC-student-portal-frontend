import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

import useAuth from '../Hooks/useAuth'

import { getUserRequest } from '../Services/API/getUser'
import { registerStudentRequest } from '../Services/API/registerStudent'

export default function useStudentRegisterPage() {
  const [email, setEmail] = useState('test2@test.com')
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [error, setError] = useState(null)
  const sessionRef = useRef('')
  const programRef = useRef('')
  const genderRef = useRef('')
  const departmentRef = useRef('')
  const rollNoRef = useRef('')
  const sectionRef = useRef('')
  const nameRef = useRef('')
  const phoneNoRef = useRef('')
  const passwordRef = useRef('')
  const confirmRef = useRef('')

  const { setToken, setUser, setAccessToken, setDisableAuthGuard } = useAuth()

  const sendRequest = async () => {
    setError(null)
    const d = {
      session: sessionRef.current,
      program: programRef.current,
      rollNo: rollNoRef.current.toLowerCase(),
      section: sectionRef.current,
      name: nameRef.current,
      phoneNo: phoneNoRef.current,
      gender: genderRef.current.toLowerCase(),
      department: departmentRef.current,
      password: passwordRef.current,
      confirm: confirmRef.current,
      email,
    }
    try {
      const { token, email: gotEmail } = await registerStudentRequest(d)
      const user = await getUserRequest(token)
      setDisableAuthGuard(prev => true)
      setToken(token)
      setAccessToken(token)
      setUser(user)
      setShowEmailModal(true)
      setEmail(gotEmail)
    } catch (e) {
      setError(e.response.data.message)
    }
  }

  return {
    nameRef,
    phoneNoRef,
    sessionRef,
    programRef,
    rollNoRef,
    sectionRef,
    passwordRef,
    confirmRef,
    email,
    sendRequest,
    genderRef,
    departmentRef,
    showEmailModal,
    setShowEmailModal,
    error,
  }
}
