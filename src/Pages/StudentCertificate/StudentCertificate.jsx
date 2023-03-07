import { Stack, TextField, Typography, Grid, Button } from '@mui/material'
import NFCLogo from '../../Assets/Images/NFC Iet Logo.png';

const StudentCertificate = () => {
  
  return (
   
   



    <Grid container spacing={1}  align="left"  item xs={20} >
      <Stack direction='row' spacing={2}>
        <Typography>Serial No.</Typography>
        <TextField variant='standard' />
      </Stack>

      <img src={NFCLogo} style={{ width: 200 ,height: 160 }} alt='Logo' />
      <Stack direction='row' spacing={2}>
        <Typography>Regis No.</Typography>
        <TextField variant='standard' />
      </Stack>

      
        <Grid container  justify="center" align="center"  item xs={12}>

          <Stack spacing={4}>
            <Stack direction='row' spacing={2}  justifyContent='center'
      alignItems='center'>
      
              <Typography>This Certificate is awarded to </Typography>
              

              <TextField variant='standard' />
              <Typography> S/D/o </Typography>
              <TextField variant='standard' />

            </Stack>

            <Stack direction='row' spacing={2}>
              <Typography>at</Typography>
              <TextField variant='standard' />
              <Typography> on this </Typography>
              <TextField variant='standard' />
              <Typography> day of</Typography>
              <TextField variant='standard' />
            </Stack>
            <Stack direction='row' spacing={2}>
              on successful completion of the certificate course of
            </Stack>
            <Stack direction='row' spacing={2}>
              <TextField variant='standard' />
              <Typography>in</Typography>
              <TextField variant='standard' />
              <Typography>grade</Typography>

            </Stack>
            <Stack direction='row' spacing={2}>
              <TextField variant='standard' />
              <Typography>from</Typography>
              <TextField variant='standard' />
              <Typography>to</Typography>
              <TextField variant='standard' />


            </Stack>

            <Stack direction='row' spacing={2}>
              <Typography>from</Typography>
              <TextField variant='standard' />

            </Stack>

          </Stack>
          
        </Grid>
        <Button variant="contained">Download</Button>


        
      </Grid>

    


  )
}

export default StudentCertificate;
