import axios from 'axios'

export const registerDepartmentRequest = async (token, d) => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/departments`,
    method: 'POST',
    data: d,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
