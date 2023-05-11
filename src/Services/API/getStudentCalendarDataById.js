import axios from 'axios'

export const getStudentCalendarDataByIdRequest = async (token, studentId) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/attendance/calendar-data/${studentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return data
}
