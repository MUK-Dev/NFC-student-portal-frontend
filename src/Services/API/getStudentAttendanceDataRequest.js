import axios from 'axios'

export const getStudentAttendanceDataRequest = async (
  token,
  department,
  program,
  session,
  section,
) => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_API_URL
    }/attendance-student-data?department=${department}&program=${program}&session=${session}&section=${section}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return data
}
