import axios from 'axios'

export const postMarksRequest = async (token, marksDTO) => {
  console.log('enter marks')
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/marks/student`,
    method: 'POST',
    data: marksDTO,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
