import axios from 'axios'

export const postAttendenceRequest = async (token, attendanceDTO) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/attendance/student`,
    method: 'POST',
    data: attendanceDTO,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}
