import { LinearProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useAuth from '../Hooks/useAuth'

// ==============================|| AUTH GUARD ||============================== //
const AuthGuard = ({ children, path = '/' }) => {
  const { isAuthLoading, user, disableAuthGuard } = useAuth()
  const navigate = useNavigate()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    setIsChecking(prev => true)
    if (isAuthLoading || disableAuthGuard) return
    if (!!!user && !isAuthLoading) {
      navigate(path, { replace: true })
      setIsChecking(prev => false)
    } else if (!!user && !isAuthLoading) {
      const currentPath = window.location.pathname
      if (currentPath === '/register' || currentPath === '/') {
        if (user?.role === 'Student') {
          navigate('/student/home', { replace: true })
          setIsChecking(prev => false)
        } else if (user?.role === 'Parent') {
          navigate('/parent/home', { replace: true })
          setIsChecking(prev => false)
        } else if (user?.role === 'Admin') {
          navigate('/head/dashboard', { replace: true })
          setIsChecking(prev => false)
        } else if (user?.role === 'Teacher') {
          navigate('/teacher/home', { replace: true })
          setIsChecking(prev => false)
        }
      }
    }
  }, [!!user, navigate, path, isAuthLoading])

  return (
    <>
      {isAuthLoading && isChecking ? (
        <LinearProgress
          sx={{
            width: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 10000,
          }}
        />
      ) : (
        children
      )}
    </>
  )
}

export default AuthGuard
