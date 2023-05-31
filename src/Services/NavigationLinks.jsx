import {
  FeaturedPlayList,
  Group,
  HolidayVillage,
  List,
  Person,
} from '@mui/icons-material'
import ApartmentIcon from '@mui/icons-material/Apartment'
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import GradingIcon from '@mui/icons-material/Grading'
import HomeIcon from '@mui/icons-material/Home'
import LayersIcon from '@mui/icons-material/Layers'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import ReorderIcon from '@mui/icons-material/Reorder'
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
        title: 'Scanner',
        path: '/student/scanner',
        icon: (
          <DocumentScannerIcon
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
        title: 'Result',
        path: '/student/detail-progress',
        icon: (
          <GradingIcon
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
        title: 'Home',
        path: '/head/dashboard',
        icon: (
          <HomeIcon
            htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
          />
        ),
      },
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
        title: 'Section',
        path: '/head/register/section',
        icon: (
          <AutoAwesomeMotionIcon
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
        title: 'Teacher',
        path: '/head/register/teacher',
        icon: (
          <Person
            htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
          />
        ),
      },
      {
        title: 'Search Student',
        path: '/head/search/students',
        icon: (
          <Group
            htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
          />
        ),
      },
      {
        title: 'Result Records',
        path: '/head/result-sheets',
        icon: (
          <FeaturedPlayList
            htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
          />
        ),
      },
      {
        title: 'Attendance Records',
        path: '/head/attendance/records',
        icon: (
          <List
            htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
          />
        ),
      },
    ]
  else if (role === 'Teacher')
    return [
      {
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
            htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
          />
        ),
      },
      {
        title: 'Attendance Records',
        path: '/teacher/sheets',
        icon: (
          <List
            htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
          />
        ),
      },
      {
        title: 'Result Records',
        path: '/teacher/result-sheets',
        icon: (
          <ReorderIcon
            htmlColor={theme.palette.getContrastText(theme.palette.grey[400])}
          />
        ),
      },
    ]
  else return []
}
