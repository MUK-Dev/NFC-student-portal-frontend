import { Stack, TextField, Typography, Grid, Button} from '@mui/material'
import Box from '@mui/material/Box';
import NFCLogo from '../../Assets/Images/NFC Iet Logo.png';


const StudentCertificate = () => {

  return (
    <Grid >
      <Stack  sx={{ border: '5px solid' }}>

      <Stack direction="row"
  justifyContent="space-evenly"
  alignItems="center"
  spacing={0}>

      <Typography>Serial No.</Typography>
          <TextField variant='standard'/>
      <img src={NFCLogo} style={{ width: 200, height: 160 }} alt='Logo'/>
      <Typography >Reg No.</Typography>
          <TextField variant='standard'/>

</Stack>
       
<Stack alignContent='center' justify="center">

        <Stack >
          <Typography variant='h6' align='center'style={{color:"#70231d" , fontFamily: '"Montserrat", Open Sans, bold'}} >
            NFC Institute of Engineering and Technology
            </Typography>


        </Stack>
        <Stack > 
          <Typography variant='h6' align='center' style={{color:"#70231d" , fontFamily: '"Montserrat", Open Sans, bold'}}>
          Degree Awarding Certificate
          </Typography>
          </Stack>


       

          <Stack spacing={2}>
            <Stack direction='row' spacing={2} justifyContent='center'
              alignItems='center'>

              <Typography >This Certificate is awarded to </Typography>


              <TextField variant='standard' />
              <Typography> S/D/o </Typography>
              <TextField variant='standard' />

            </Stack>

            <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
              <Typography >at</Typography>
              <TextField variant='standard' />
              <Typography > on this </Typography>
              <TextField variant='standard' />
              <Typography > day of</Typography>
              <TextField variant='standard' />
            </Stack>
            <Stack direction='row' spacing={2} justifyContent='center'alignItems='center'>
              on successful completion of the certificate course of
            </Stack>
            <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
              <TextField variant='standard' />
              <Typography >in</Typography>
              <TextField variant='standard' />
              <Typography >grade</Typography>

            </Stack>
            <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
              <TextField variant='standard' />
              <Typography >from</Typography>
              <TextField variant='standard' />
              <Typography >to</Typography>
              <TextField variant='standard' />


            </Stack>

            <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
              <Typography align='center'>from</Typography>
              <TextField variant='standard' />

            </Stack>

          </Stack>

  
        
      </Stack>
      <Box component="span" sx={{ p: 2 }} display="flex"
  justifyContent="flex-end"
  alignItem="flex-end">
      <Button variant="contained">Download PDF</Button>
    </Box>    
    </Stack>
    </Grid>

  )
}


export default StudentCertificate;
