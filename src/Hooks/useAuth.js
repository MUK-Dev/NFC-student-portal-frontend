import { useContext } from 'react'

import { AuthContext } from '../Contexts/AuthContext'

export default function useAuth() {
  return useContext(AuthContext)
}
