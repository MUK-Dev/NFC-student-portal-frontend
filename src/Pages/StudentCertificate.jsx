import { Stack, TextField, Typography, Grid, Button, FormGroup} from '@mui/material'
import Box from '@mui/material/Box';
import NFCLogo from '../../Assets/Images/NFC Iet Logo.png';
import useAuth from '../../Hooks/useAuth'
import { useQuery } from 'react-query'

import { getStudentCertificateRequest } from '../../Services/API/getStudentCertificateRequest'
import { AppRegistration, Label } from '@mui/icons-material';
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from 'react';
import { string } from 'yup';
import axios from 'axios';

import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const handleCaptureClick = async (pdf = false) => {
  console.log('clicked');
  const pricingTableElmt =
    document.getElementById('student-certificate-section');
  if (!pricingTableElmt) return;
  try {
    if (pdf) {
      const canvas = await html2canvas(pricingTableElmt);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('download.pdf');
    } else {
      const canvas = await html2canvas(pricingTableElmt);
      const dataURL = canvas.toDataURL('image/png');
      downloadjs(dataURL, 'download.png', 'image/png');
    }
  } catch (error) {
    console.error('Error capturing and downloading:', error);
  }
};



const StudentCertificate = () => {
  const [value, setValue] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRollNoChange = (event) => {
    setValue(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    setError('');
  
    try {
      const response = await axios.get('http://localhost:8000/api/v1/students');
      const students = response.data.data;
  
      const foundStudentData = students.find((student) => student.rollNo === value);
  
      if (foundStudentData) {
        setStudentData(foundStudentData);
      } else {
        setStudentData(null);
        setError('Roll number not found');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while fetching student data');
    }
  
    setLoading(false);
  };
  

  const { user, token } = useAuth()
 
  return (
<Grid>
<div id="student-certificate-section">
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          studentData && (
            <Stack sx={{ border: '10px solid' }}>
            <Stack sx={{ borderRadius: '16px' }}>
              <Stack direction="row" justifyContent="space-between" margin="1em">
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography>Roll No:</Typography>
                  <Typography>{studentData.rollNo}</Typography>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography>Registration No:</Typography>
                  <Typography>{studentData.registrationNo}</Typography>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" margin="1em">
                <Typography variant="h4">
                  <b>NFC INSTITUTE OF ENGINEERING & TECHNOLOGY, MULTAN</b>
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="center" alignItems="center">
                <img src={NFCLogo} style={{ width: 200, height: 160 }} alt="logo" />
              </Stack>

              <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" margin="1em">
                <Typography variant="h5" align="center" style={{ color: '#70231d' }}>
                  <b>Degree Awarding Certificate</b>
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" margin="1em">
                <Typography>This is to certify that</Typography>
              </Stack>

              <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" margin="1em">
                <Typography variant="h6">Name:</Typography>
                <Typography>{studentData.name}</Typography>
                <Typography variant="h6">S/D/o:</Typography>
                <Typography>{studentData.fatherName}</Typography>
              </Stack>

              <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" margin="2em">
                <Typography variant="h6">After having fulfilled the requirements has been duly admitted to the degree of</Typography>
              </Stack>

              <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" margin="1em">
                <Typography variant="h6">
                  <b>BS in</b>
                </Typography>
                <Typography>{studentData.Department}</Typography>
              </Stack>

              <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                <Typography>
                  <b>Securing:</b>
                </Typography>
                <Typography>{studentData.cgpa}</Typography>
                <Typography>/4.0</Typography>
              </Stack>

              <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" margin="1em">
                <Typography>
                  <b>Grade:</b>
                </Typography>
                <Typography>{studentData.grade}</Typography>
              </Stack>

              <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" margin="1em">
                <Typography>
                  <b>Date of Completion:</b>
                </Typography>
                <Typography>{new Date(studentData.dateOfCompletion).toLocaleDateString()}</Typography>
              </Stack>

              <Stack direction="column" alignItems="start" margin="1em">
                <TextField id="standard-basic" label="" variant="standard" />
                <Typography>
                  <b>Controller Examinations</b>
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" margin="1em">
                <Stack direction="row" spacing={2} justifyContent="left" alignItems="center">
                  <Typography>
                    <b>Multan, Date</b>
                  </Typography>
                  <Typography>{new Date(studentData.date).toLocaleDateString()}</Typography>
                </Stack>
                <Stack direction="column" spacing={2} justifyContent="right" alignItems="center" margin="1em">
                  <TextField id="standard-basic" variant="standard" />
                  <Typography>
                    <b>Vice Chancellor</b>
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          )
        )}

      </div>

      <Stack direction="row" justifyContent="space-between" alignItems="center" padding="1em">
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography>Roll No:</Typography>
          <TextField id="standard-basic" value={value} variant="standard" placeholder='Enter the Roll No' onChange={handleRollNoChange} />
        </Stack>
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Stack>
      {error && (
  <Typography sx={{ color: 'red', marginTop: '1em', textAlign: 'center' }}>
    Error: {error}
  </Typography>
)}

      <Box component="span" sx={{ p: 2 }} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Button style={{ marginRight: 5 }} variant="contained" onClick={() => handleCaptureClick(true)}>
          Download PDF
        </Button>
        <Button variant="contained" onClick={() => handleCaptureClick(false)}>
          Download PNG
        </Button>
      </Box>
    </Grid>
  )
  }      


export default StudentCertificate;
