import FactCheckIcon from '@mui/icons-material/FactCheck'
import GradeIcon from '@mui/icons-material/Grade'
import GradingIcon from '@mui/icons-material/Grading'
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage'
import HomeIcon from '@mui/icons-material/Home'
import House from '@mui/icons-material/House'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

export const getLinks = theme => {
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
      title: 'UG-Department',
      path: '/head/register/department',
      icon: (
        <House
          htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
        />
      ),
    },
    {
      title: 'UG-Program',
      path: '/head/register/program',
      icon: (
        <House
          htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
        />
      ),
    },
    {
      title: 'UG-Session',
      path: '/head/register/session',
      icon: (
        <House
          htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
        />
      ),
    },
    {
      title: 'UG-Semester',
      path: '/head/register/semester',
      icon: (
        <House
          htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
        />
      ),
    },
    {
      title: 'UG-Subject',
      path: '/head/register/subject',
      icon: (
        <House
          htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
        />
      ),
    },
    {
      title: 'UG-Students',
      path: '/head/register/students',
      icon: (
        <House
          htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
        />
      ),
    },
    {
      title: 'UG-Teachers',
      path: '/head/register/teachers',
      icon: (
        <House
          htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
        />
      ),
    },
    {
      title: 'IG-Departpent',
      path: '/head/register/i-department',
      icon: (
        <HolidayVillageIcon
          htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
        />
      ),
    },

    {
      title: 'IG-Program',
      path: '/head/register/i-program',
      icon: (
        <HolidayVillageIcon
          htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
        />
      ),
    },
    {
      title: 'IG-Session',
      path: '/head/register/i-session',
      icon: (
        <HolidayVillageIcon
          htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
        />
      ),
    },
    {
      title: 'IG-Semester',
      path: '/head/register/i-semester',
      icon: (
        <HolidayVillageIcon
          htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
        />
      ),
    },
    {
      title: 'IG-Subject',
      path: '/head/register/i-subject',
      icon: (
        <HolidayVillageIcon
          htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
        />
      ),
    },
  ]
}
