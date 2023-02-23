import { CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

<<<<<<< HEAD
import Login from './Pages/Auth/Login';
import AuthLayout from './Pages/Layouts/AuthLayout';
import Register from './Pages/Auth/Register';
import DashboardLayout from './Pages/Layouts/DashboardLayout';
import StudentDashboard from './Pages/StudentDashboard/StudentDashboard';
import RDepartment from './Pages/UG-HeadForms/RDepartment';
import RStudents from './Pages/UG-HeadForms/RStudents';
import RSubject from './Pages/UG-HeadForms/RSubject';
import RTeachers from './Pages/UG-HeadForms/RTeachers';
import RProgram from './Pages/UG-HeadForms/RProgram';
import RSession from './Pages/UG-HeadForms/RSession';
import RSemester from './Pages/UG-HeadForms/RSemester';
import StudentAttendance from './Pages/StudentAttendance/StudentAttendance';
import StudentCertificate from './Pages/StudentCertificate/StudentCertificate';
import StudentProgress from './Pages/StudentProgress/StudentProgress';
import IDepartment from './Pages/IG-HeadForms/IDepartment';
import IProgram from './Pages/IG-HeadForms/IProgram';
import ISemester from './Pages/IG-HeadForms/ISemester';
import ISession from './Pages/IG-HeadForms/ISession';
import ISubject from './Pages/IG-HeadForms/ISubject';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import StudentDetailProgress from './Pages/StudentProgress/StudentDetailProgress';
import StudentTranscript from './Pages/StudentProgress/StudentTranscript';
=======
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import IDepartment from './Pages/IG-HeadForms/IDepartment'
import IProgram from './Pages/IG-HeadForms/IProgram'
import ISemester from './Pages/IG-HeadForms/ISemester'
import ISession from './Pages/IG-HeadForms/ISession'
import ISubject from './Pages/IG-HeadForms/ISubject'
import AuthLayout from './Pages/Layouts/AuthLayout'
import DashboardLayout from './Pages/Layouts/DashboardLayout'
import StudentAttendance from './Pages/StudentAttendance/StudentAttendance'
import StudentCertificate from './Pages/StudentCertificate/StudentCertificate'
import StudentDashboard from './Pages/StudentDashboard/StudentDashboard'
import StudentDetailProgress from './Pages/StudentProgress/StudentDetailProgress'
import StudentProgress from './Pages/StudentProgress/StudentProgress'
import RDepartment from './Pages/UG-HeadForms/RDepartment'
import RProgram from './Pages/UG-HeadForms/RProgram'
import RSemester from './Pages/UG-HeadForms/RSemester'
import RSession from './Pages/UG-HeadForms/RSession'
import RStudents from './Pages/UG-HeadForms/RStudents'
import RSubject from './Pages/UG-HeadForms/RSubject'
import RTeachers from './Pages/UG-HeadForms/RTeachers'

import AuthProvider from './Contexts/AuthContext'
>>>>>>> 49c8f64f3c8bc5356da2e0e48b28d1b541dc9839

const App = () => {
  // #dcdfca
  const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#70231d',
      },
      secondary: {
        main: '#4a4a4a',
      },
      background: {
        default: '#ffffff',
      },
    },
  })

  return (
<<<<<<< HEAD
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <BrowserRouter>
          <CssBaseline />
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path='/' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Route>
            <Route element={<DashboardLayout />}>
              <Route path='/student/home' element={<StudentDashboard />} />
              <Route
                path='/student/attendance'
                element={<StudentAttendance />}
              />
              <Route
                path='/head/register/department'
                element={<RDepartment />}
              />
              <Route path='/head/register/subject' element={<RSubject />} />
              <Route path='/head/register/students' element={<RStudents />} />
              <Route path='/head/register/teachers' element={<RTeachers />} />
              <Route path='/head/register/program' element={<RProgram />} />
              <Route path='/head/register/session' element={<RSession />} />
              <Route path='/head/register/semester' element={<RSemester />} />
              <Route path='/student/progress' element={<StudentProgress />} />
              <Route
                path='/student/detail-progress'
                element={<StudentDetailProgress />}
              />
              <Route
                path='/head/register/i-department'
                element={<IDepartment />}
              />
              <Route path='/head/register/i-program' element={<IProgram />} />
              <Route path='/head/register/i-semester' element={<ISemester />} />
              <Route path='/head/register/i-session' element={<ISession />} />
              <Route path='/head/register/i-subject' element={<ISubject />} />
              <Route
                path='/student/certificate'
                element={<StudentCertificate />}
              />
              <Route
                path='/student/transcript'
                element={<StudentTranscript />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
};
=======
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <CssBaseline />
            <Routes>
              <Route element={<AuthLayout />}>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Register />} />
              </Route>
              <Route element={<DashboardLayout />}>
                <Route path='/student/home' element={<StudentDashboard />} />
                <Route
                  path='/student/attendance'
                  element={<StudentAttendance />}
                />
                <Route
                  path='/head/register/department'
                  element={<RDepartment />}
                />
                <Route path='/head/register/subject' element={<RSubject />} />
                <Route path='/head/register/students' element={<RStudents />} />
                <Route path='/head/register/teachers' element={<RTeachers />} />
                <Route path='/head/register/program' element={<RProgram />} />
                <Route path='/head/register/session' element={<RSession />} />
                <Route path='/head/register/semester' element={<RSemester />} />
                <Route path='/student/progress' element={<StudentProgress />} />
                <Route
                  path='/student/detail-progress'
                  element={<StudentDetailProgress />}
                />
                <Route
                  path='/head/register/i-department'
                  element={<IDepartment />}
                />
                <Route path='/head/register/i-program' element={<IProgram />} />
                <Route
                  path='/head/register/i-semester'
                  element={<ISemester />}
                />
                <Route path='/head/register/i-session' element={<ISession />} />
                <Route path='/head/register/i-subject' element={<ISubject />} />
                <Route
                  path='/student/certificate'
                  element={<StudentCertificate />}
                />
              </Route>
            </Routes>
          </LocalizationProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
>>>>>>> 49c8f64f3c8bc5356da2e0e48b28d1b541dc9839

export default App
