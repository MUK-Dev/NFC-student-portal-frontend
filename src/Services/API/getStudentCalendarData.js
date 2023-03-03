import axios from 'axios'

export const getStudentCalendarDataRequest = async token => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/attendance/student/calendar-data`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return data
}
