import { useEffect, useMemo, useRef, useState } from 'react'

import { getUserRequest } from '../Services/API/getUser'
import { registerStudentRequest } from '../Services/API/registerStudent'
import useAuth from '../Hooks/useAuth'
import { useNavigate } from 'react-router'

export default function useStudentRegisterPage() {
  const [gender, setGender] = useState('')
  const [department, setDepartment] = useState('')
  const [email, setEmail] = useState('@undergrad.nfciet.edu.pk')
  const [error, setError] = useState(null)
  const sessionRef = useRef('')
  const programRef = useRef('')
  const rollNoRef = useRef('')
  const sectionRef = useRef('')
  const nameRef = useRef('')
  const phoneNoRef = useRef('')
  const passwordRef = useRef('')
  const confirmRef = useRef('')
  const navigate = useNavigate()

  const { setToken, setUser, setAccessToken } = useAuth()

  const emailDependents = useMemo(
    () => ({
      session: sessionRef.current.toLowerCase(),
      program: programRef.current.toLowerCase(),
      rollNo: rollNoRef.current.toLowerCase(),
    }),
    [sessionRef.current, programRef.current, rollNoRef.current]
  )

  const sendRequest = async () => {
    setError(null)
    const d = {
      session: sessionRef.current.toLowerCase(),
      program: programRef.current.toLowerCase(),
      rollNo: rollNoRef.current.toLowerCase(),
      section: sectionRef.current.toLowerCase(),
      name: nameRef.current,
      phoneNo: phoneNoRef.current,
      gender: gender.toLowerCase(),
      department: department.toLowerCase(),
      password: passwordRef.current,
      confirm: confirmRef.current,
      email,
    }
    try {
      const { token } = await registerStudentRequest(d)
      const user = await getUserRequest(token)
      setToken(token)
      setAccessToken(token)
      setUser(user)
      navigate('/student/home')
    } catch (e) {
      console.log(e)
      setError(e.response.data.message)
    }
  }

  useEffect(() => {
    setEmail(
      `${emailDependents.session}${emailDependents.program}${emailDependents.rollNo}@undergrad.nfciet.edu.pk`
    )
  }, [emailDependents])

  return {
    nameRef,
    phoneNoRef,
    sessionRef,
    programRef,
    rollNoRef,
    sectionRef,
    gender,
    setGender,
    department,
    setDepartment,
    passwordRef,
    confirmRef,
    email,
    sendRequest,
    error,
  }
}
