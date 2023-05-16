import { useState } from 'react'

export default function useSnackbar() {
  const [snackbar, setSnackbar] = useState({
    severity: 'success',
    message: '',
    open: false,
  })

  const onClose = () => setSnackbar(prev => ({ ...prev, open: false }))
  return { snackbar, onClose, setSnackbar }
}
