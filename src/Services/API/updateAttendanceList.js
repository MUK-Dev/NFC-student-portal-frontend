import axios from 'axios'

export const updateAttendanceListRequest = async (
  token,
  sheetId,
  attendanceDTO,
) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/attendance/student/${sheetId}`,
    method: 'PATCH',
    data: attendanceDTO,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}
