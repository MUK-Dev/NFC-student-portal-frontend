import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
import AuthProvider from './Contexts/AuthContext';

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
  });

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
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
          </BrowserRouter>
        </LocalizationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
