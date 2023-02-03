import axios from 'axios'

export const getUserRequest = async token => {
  const { data } = await axios({
    url: 'http://localhost:6000/api/get-user',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}
