import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { getUserRequest } from '../Services/API/getUser'

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)
  const [disableAuthGuard, setDisableAuthGuard] = useState(false)
  const navigate = useNavigate()

  const setAccessToken = token => localStorage.setItem('token', token)
  const getAccessToken = () => localStorage.getItem('token')
  const deleteAccessToken = () => localStorage.removeItem('token')

  const reAuthenticate = async () => {
    setIsAuthLoading(prev => true)
    const t = getAccessToken()
    if (!t) {
      setIsAuthLoading(prev => false)
      return
    }
    try {
      const user = await getUserRequest(t)
      setToken(t)
      setUser(user)
      setIsAuthLoading(prev => false)
    } catch (err) {
      navigate('/')
      setIsAuthLoading(prev => false)
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    deleteAccessToken()
  }

  useEffect(() => {
    reAuthenticate()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        setAccessToken,
        getAccessToken,
        isAuthLoading,
        disableAuthGuard,
        setDisableAuthGuard,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
