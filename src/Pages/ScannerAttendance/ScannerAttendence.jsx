import CameraswitchIcon from '@mui/icons-material/Cameraswitch'
import { Button, IconButton, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useState } from 'react'
import { QrReader } from 'react-qr-reader'

const ScannerAttendence = () => {
  const [selected, setSelected] = useState('environment')
  const [startScan, setStartScan] = useState(false)
  const [loadingScan, setLoadingScan] = useState(false)
  const [data, setData] = useState('')

  const handleScan = async scanData => {
    setLoadingScan(true)
    console.log(`loaded data data`, scanData)
    if (scanData && scanData !== '') {
      console.log(`loaded >>>`, scanData)
      setData(scanData.text)
      setStartScan(false)
      setLoadingScan(false)
      // setPrecScan(scanData);
    }
  }
  const handleError = err => {
    console.error(err)
  }
  const toggleCamera = () => {
    if (selected === 'environment') setSelected(e.target.user)

    elseif(selected === 'user')
    setSelected(e.target.environment)
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

          <QrReader
            facingMode={selected}
            delay={1000}
            onError={handleError}
            // onScan={handleScan}
            onResult={handleScan}
            // chooseDeviceId={()=>selected}
            style={{ width: '100px !important' }}
          />
        </>
      )}
      {loadingScan && <p>Loading</p>}
      {data !== '' && <p>{data}</p>}
    </>
  )
}

export default ScannerAttendence
