import { Button, Grid, Stack, TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import NFCLogo from '../../Assets/Images/NFC Iet Logo.png'

const StudentCertificate = () => {
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()

  const downloadPDF = () => {
    const capture = document.querySelector('.actual-receipt')
    setLoader(true)
    html2canvas(capture).then(canvas => {
      const imgData = canvas.toDataURL('img/png')
      const doc = new jsPDF('l', 'mm', [1244, 573])
      const componentWidth = doc.internal.pageSize.getWidth()
      const componentHeight = doc.internal.pageSize.getHeight()
      doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight)
      setLoader(false)
      doc.save('Certificate.pdf')
    })
  }

  return (
    <Grid >
      <Stack sx={{ border: '5px solid' }}  className="actual-receipt">
        <Stack
          direction='row'
          justifyContent='space-evenly'
          alignItems='center'
          spacing={0}
        >
          <Typography>Serial No.</Typography>
          <TextField variant='standard' />
          <img src={NFCLogo} style={{ width: 200, height: 160 }} alt='Logo' />
          <Typography>Reg No.</Typography>
          <TextField variant='standard' />
        </Stack>

        <Stack alignContent='center' justify='center'>
          <Stack>
     

              <Typography
                variant='h6'
                align='center'
                style={{
                  color: '#ffffff',
                  fontFamily: '"Montserrat", Open Sans, bold',
                  backgroundColor: '#70231d',
                }}
              >
                NFC Institute of Engineering and Technology
              </Typography>
            </Stack>
            <Stack>
              <Typography
                variant='h6'
                align='center'
                style={{
                  color: '#ffffff',
                  fontFamily: '"Montserrat", Open Sans, bold',
                  backgroundColor: '#70231d',
                }}
              >
                Degree Awarding Certificate
              </Typography>
            </Stack>

            <Stack spacing={2}>
              <Stack
                direction='row'
                spacing={2}
                justifyContent='center'
                alignItems='center'
              >
                <Typography>This Certificate is awarded to </Typography>

                <TextField variant='standard' />
                <Typography> S/D/o </Typography>
                <TextField variant='standard' />
              </Stack>

              <Stack
                direction='row'
                spacing={2}
                justifyContent='center'
                alignItems='center'
              >
                <Typography>at</Typography>
                <TextField variant='standard' />
                <Typography> on this </Typography>
                <TextField variant='standard' />
                <Typography> day of</Typography>
                <TextField variant='standard' />
              </Stack>
              <Stack
                direction='row'
                spacing={2}
                justifyContent='center'
                alignItems='center'
              >
                on successful completion of the certificate course of
              </Stack>
              <Stack
                direction='row'
                spacing={2}
                justifyContent='center'
                alignItems='center'
              >
                <TextField variant='standard' />
                <Typography>in</Typography>
                <TextField variant='standard' />
                <Typography>grade</Typography>
              </Stack>
              <Stack
                direction='row'
                spacing={2}
                justifyContent='center'
                alignItems='center'
              >
                <TextField variant='standard' />
                <Typography>from</Typography>
                <TextField variant='standard' />
                <Typography>to</Typography>
                <TextField variant='standard' />
              </Stack>

              <Stack
                direction='row'
                spacing={2}
                justifyContent='center'
                alignItems='center'
              >
                <Typography align='center'>from</Typography>
                <TextField variant='standard' />
                  
            <Stack>
              </Stack>
            </Stack>
          </Stack>
          <Box
            component='span'
            sx={{ p: 2 }}
            display='flex'
            justifyContent='flex-end'
            alignItems='flex-end'
          >
            <Button
              variant='contained'
              onClick={downloadPDF}
              disabled={!(loader === false)}
            >
              {loader ? <span>Downloading</span> : <span>Download</span>}
            
            </Button>

            <Button
              variant='contained'
              onClick={() => navigate('/student/studentcertificate')}
              disableElevation
            >
              Manual Certificate
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Grid>
  )

              }
export default StudentCertificate
