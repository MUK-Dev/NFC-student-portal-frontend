import CameraswitchIcon from '@mui/icons-material/Cameraswitch'
import { Button, IconButton, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import QrReader from 'modern-react-qr-reader'
import { useState } from 'react'

import AttendanceSuccessModal from '../../Components/Modal/AttendanceSuccessModal'
import QRAttendanceErrorModel from '../../Components/Modal/QRAttendanceErrorModal'

import useAuth from '../../Hooks/useAuth'

import { MarkAttendancewithQR } from '../../Services/API/markAttendancewithQR'

const ScannerAttendence = () => {
  const [errorModal, setErrorModal] = useState(false)
  const [successModal, setSuccessModel] = useState(false)

  const [selected, setSelected] = useState('environment')
  const [startScan, setStartScan] = useState(false)
  const [loadingScan, setLoadingScan] = useState(false)
  const [data, setData] = useState('')
  const { token } = useAuth()

  const handleError = err => console.log(err)

  const handleScan = async scanData => {
    setLoadingScan(true)
    if (scanData && scanData !== '') {
      try {
        const res = await MarkAttendancewithQR(token, scanData)
        setSuccessModel(res.message)
      } catch (err) {
        setErrorModal(err.response.data.message)
        setIsSubmitting(prev => false)
      }
    }
    setStartScan(false)
    setLoadingScan(false)
  }

  const toggleCamera = () => {
    if (selected === 'environment') setSelected('user')
    else if (selected === 'user') setSelected('environment')
  }

  return (
    <>
      <Stack alignContent='center' alignItems='center'>
        <Typography variant='h4'>Scanner For Attendance</Typography>
        <Typography variant='h6'>Scan QR code from your Teacher</Typography>

        <Button
          variant='contained'
          gap='1em  '
          onClick={() => {
            setStartScan(!startScan)
          }}
        >
          {startScan ? 'Stop Scan' : 'Start Scan'}
        </Button>
      </Stack>

      {startScan && (
        <>
          {/* <select onChange={e => setSelected(e.target.value)}>
            <option value={'environment'}>Back Camera</option>
            <option value={'user'}>Front Camera</option>
          </select> */}
          <IconButton
            aria-label='cameraswitch'
            size='large'
            onClick={toggleCamera}
          >
            <CameraswitchIcon fontSize='inherit' />
          </IconButton>

          {!loadingScan && (
            <QrReader
              facingMode={selected}
              delay={1500}
              onScan={handleScan}
              style={{ width: '300px' }}
            />
          )}
        </>
      )}
      {loadingScan && <p>Loading</p>}
      {data !== '' && <p>{data}</p>}
      <AttendanceSuccessModal open={!!successModal} text={successModal} />
      <QRAttendanceErrorModel
        open={!!errorModal}
        text={errorModal}
        onClose={() => setErrorModal(prev => !prev)}
      />
    </>
  )
}

export default ScannerAttendence
