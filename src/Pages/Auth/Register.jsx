/* eslint-disable react-hooks/exhaustive-deps */
import { Stack } from '@mui/material'
import { AnimatePresence } from 'framer-motion'

import ParentForm from '../../Components/auth/ParentForm'
import RegisterOptions from '../../Components/auth/RegisterOptions'
import StudentForm from '../../Components/auth/StudentForm/StudentForm'

import useRegisterPage from '../../Hooks/useRegisterPage'

import NFCLogo from '../../Assets/Images/NFC Iet Logo.png'

const Register = () => {
  const { form, formAnimation } = useRegisterPage()
  let f
  if (form === 0) f = <ParentForm animation={formAnimation} />
  else if (form === 1) f = <StudentForm animation={formAnimation} />
  else if (form === 2) f = <RegisterOptions animation={formAnimation} />

  return (
    <Stack
      direction='column'
      alignItems='center'
      width='100%'
      minHeight='100vh'
      paddingTop='40%'
    >
      <img
        src={NFCLogo}
        style={{
          width: 100,
          height: 90,
        }}
        alt='Logo'
      />
      <AnimatePresence mode='wait'>{f}</AnimatePresence>
    </Stack>
  )
}

export default Register
