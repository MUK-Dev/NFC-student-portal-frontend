import axios from 'axios'

export const getUserRequest = async token => {
  const { data } = await axios({
    url: `${import.meta.env.VITE_API_URL}/get-user`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}
