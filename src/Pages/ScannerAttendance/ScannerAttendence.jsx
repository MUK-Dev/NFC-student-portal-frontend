import { useState } from 'react'

//import QrReader from 'react-qr-reader'
import * as QrReader from '/node_modules/.vite/deps/react-qr-reader.js'

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
      setData(scanData)
      setStartScan(false)
      setLoadingScan(false)
      // setPrecScan(scanData);
    }
  }
  const handleError = err => {
    console.error(err)
  }
  return (
    <div className='App'>
      <h1>Hello CodeSandbox</h1>
      <h2>
        Last Scan:
        {selected}
      </h2>

      <button
        onClick={() => {
          setStartScan(!startScan)
        }}
      >
        {startScan ? 'Stop Scan' : 'Start Scan'}
      </button>
      {startScan && (
        <>
          <select onChange={e => setSelected(e.target.value)}>
            <option value={'environment'}>Back Camera</option>
            <option value={'user'}>Front Camera</option>
          </select>
          <QrReader
            facingMode={selected}
            delay={1000}
            onError={handleError}
            onScan={handleScan}
            // chooseDeviceId={()=>selected}
            style={{ width: '300px' }}
          />
        </>
      )}
      {loadingScan && <p>Loading</p>}
      {data !== '' && <p>{data}</p>}
    </div>
  )
}

export default ScannerAttendence
