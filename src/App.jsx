import { CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import RDepartment from './Pages/HeadForms/RDepartment'
import RProgram from './Pages/HeadForms/RProgram'
import RSemester from './Pages/HeadForms/RSemester'
import RSession from './Pages/HeadForms/RSession'
import RStudents from './Pages/HeadForms/RStudents'
import RSubject from './Pages/HeadForms/RSubject'
import RTeachers from './Pages/HeadForms/RTeachers'
import AuthLayout from './Pages/Layouts/AuthLayout'
import DashboardLayout from './Pages/Layouts/DashboardLayout'
import ParentHome from './Pages/Parent-Home/Parent_Home'
import StudentAttendance from './Pages/StudentAttendance/StudentAttendance'
import StudentCertificate from './Pages/StudentCertificate/StudentCertificate'
import StudentDashboard from './Pages/StudentDashboard/StudentDashboard'
import StudentDetailProgress from './Pages/StudentProgress/StudentDetailProgress'
import StudentProgress from './Pages/StudentProgress/StudentProgress'
import StudentsTranscript from './Pages/StudentProgress/StudentTranscript'

import AuthProvider from './Contexts/AuthContext'

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
                  path='/student/transcript'
                  element={<StudentsTranscript />}
                />
                <Route
                  path='/student/detail-progress'
                  element={<StudentDetailProgress />}
                />
                <Route
                  path='/student/certificate'
                  element={<StudentCertificate />}
                />
                <Route path='/parent/home' element={<ParentHome />} />
              </Route>
            </Routes>
          </LocalizationProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
