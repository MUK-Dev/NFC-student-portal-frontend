import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import ParentForm from '../Components/auth/ParentForm'
import RegisterOptions from '../Components/auth/RegisterOptions'
import StudentForm from '../Components/auth/StudentForm/StudentForm'

export default function useRegisterPage() {
  const [form, setForm] = useState(null)
  const [xAxis, setXAxis] = useState(0)
  const [exitXAxis, setExitXAxis] = useState('-100vw')
  const [searchParams] = useSearchParams()

  useEffect(() => {
    setXAxis('-100vw')
  }, [])

  const formAnimation = {
    initial: {
      x: xAxis,
    },
    animate: {
      x: 0,
      transition: {
        bounce: 0,
      },
    },
    exit: {
      x: exitXAxis,
    },
  }

  useEffect(() => {
    const role = searchParams.get('role')
    if (role === 'parent') {
      setForm(0)
      setXAxis('100vw')
      setExitXAxis('-100vw')
    } else if (role === 'student') {
      setForm(1)
      setXAxis('100vw')
      setExitXAxis('-100vw')
    } else {
      setForm(2)
      setXAxis('-100vw')
      setExitXAxis('100vw')
    }
  }, [searchParams])

  return { form, formAnimation }
}
