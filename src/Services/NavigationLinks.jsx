import { HolidayVillage } from '@mui/icons-material'
import AccessibilityIcon from '@mui/icons-material/Accessibility'
import ApartmentIcon from '@mui/icons-material/Apartment'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import GradeIcon from '@mui/icons-material/Grade'
import GradingIcon from '@mui/icons-material/Grading'
import HomeIcon from '@mui/icons-material/Home'
import House from '@mui/icons-material/House'
import LayersIcon from '@mui/icons-material/Layers'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import SchoolIcon from '@mui/icons-material/School'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

export const getLinks = (theme, role) => {
  if (role === 'Student')
    return [
      {
        title: 'Home',
        path: '/student/home',
        icon: (
          <HomeIcon
            htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
          />
        ),
      },
      {
        title: 'Attendance',
        path: '/student/attendance',
        icon: (
          <FactCheckIcon
            htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
          />
        ),
      },
      {
        title: 'Progress',
        path: '/student/progress',
        icon: (
          <TrendingUpIcon
            htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
          />
        ),
      },
      {
        title: 'Transcript',
        path: '/student/transcript',
        icon: (
          <GradingIcon
            htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
          />
        ),
      },
      {
        title: 'Certificate',
        path: '/student/certificate',
        icon: (
          <GradeIcon
            htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
          />
        ),
      },
      {
        title: 'Result Form',
        path: '/teacher/result-form',
        icon: (
          <SchoolIcon
            htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
          />
        ),
      },
    ]
  else if (role === 'Parent')
    return [
      {
        title: 'Home',
        path: '/parent/home',
        icon: (
          <HolidayVillage
            htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
          />
        ),
      },
    ]
  else if (role === 'Admin')
    return [
      {
        title: 'Department',
        path: '/head/register/department',
        icon: (
          <ApartmentIcon
            htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
          />
        ),
      },
      {
        title: 'Program',
        path: '/head/register/program',
        icon: (
          <LayersIcon
            htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
          />
        ),
      },
      {
        title: 'Session',
        path: '/head/register/session',
        icon: (
          <CalendarTodayIcon
            htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
          />
        ),
      },
      {
        title: 'Semester',
        path: '/head/register/semester',
        icon: (
          <MenuBookIcon
            htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
          />
        ),
      },
      {
        title: 'Subject',
        path: '/head/register/subject',
        icon: (
          <LibraryBooksIcon
            htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
          />
        ),
      },
      {
        title: 'Students',
        path: '/head/register/students',
        icon: (
          <AccessibilityIcon
            htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
          />
        ),
      },
      {
        title: 'Teachers',
        path: '/head/register/teachers',
        icon: (
          <SchoolIcon
            htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
          />
        ),
      },
    ]
  else if (role === 'Teacher')
    return [
      {
<<<<<<< HEAD
        title: 'Dashboard',
        path: '/teacher/home',
        icon: (
          <HomeIcon
            htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
          />
        ),
      },
      {
        title: 'Mark Attendance',
        path: '/teacher/mark-attandence',
        icon: (
          <FactCheckIcon
=======
        title: 'Teacher Dashboard',
        path: '/teacher/dashboard',
        icon: (
          <House
>>>>>>> d83823880f93952c437a3796d37092916bcf91a0
            htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
          />
        ),
      },
      {
        title: 'Result Form',
        path: '/teacher/result-form',
        icon: (
          <SchoolIcon
            htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
          />
        ),
      },
    ]
  else return []
}
