import axios from 'axios'

export const MarkAttendancewithQR = async (token, url) => {
  const { data } = await axios({
    url,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}
